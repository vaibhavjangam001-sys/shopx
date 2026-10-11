import mongoose from 'mongoose';
import { ApiError } from '../../utils/index.js';
import {
  getPaymentByProviderOrderId,
  updatePaymentRepository,
} from '../../repositories/payment/index.js';
import {
  getOrderByIdRepository,
  updateOrderRepository,
} from '../../repositories/order/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const handleRazorpayWebhookService = async (webhookEvent) => {
  const { event, payload } = webhookEvent;

  if (event !== 'payment.captured') {
    return { processed: false, reason: 'UNSUPPORTED_EVENT' };
  }

  const razorpayPayment = payload?.payment?.entity;

  if (
    !razorpayPayment?.id ||
    !razorpayPayment?.order_id ||
    razorpayPayment.status !== 'captured'
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
    );
  }

  const payment = await getPaymentByProviderOrderId(razorpayPayment.order_id);

  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PAYMENT.NOT_FOUND);
  }

  if (
    payment.provider !== 'RAZORPAY' ||
    razorpayPayment.amount !== Math.round(payment.amount * 100) ||
    razorpayPayment.currency !== payment.currency
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
    );
  }

  if (payment.status === 'SUCCESS') {
    if (payment.providerPaymentId !== razorpayPayment.id) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.PAYMENT.ALREADY_COMPLETED
      );
    }

    return { processed: true, duplicate: true };
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const updatedPayment = await updatePaymentRepository({
        paymentId: payment._id,
        providerPaymentId: razorpayPayment.id,
        session,
      });

      if (!updatedPayment) {
        throw new ApiError(
          HTTP_STATUS.CONFLICT,
          MESSAGES.PAYMENT.UPDATE_FAILED
        );
      }

      const order = await getOrderByIdRepository(
        payment.user,
        payment.order,
        session
      );

      if (!order) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
      }

      if (order.status !== 'PENDING') {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.ORDER.INVALID_ORDER_DETAILS
        );
      }

      const updatedOrder = await updateOrderRepository(
        payment.order,
        { status: 'CONFIRMED' },
        session
      );

      if (!updatedOrder) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          MESSAGES.ORDER.UPDATE_FAILED
        );
      }
    });
  } finally {
    await session.endSession();
  }

  return { processed: true, duplicate: false };
};

export default handleRazorpayWebhookService;
