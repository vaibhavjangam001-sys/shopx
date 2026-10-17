import mongoose from 'mongoose';
import { ApiError } from '../../utils/index.js';
import {
  getPaymentByProviderOrderId,
  updatePaymentRepository,
  markPaymentFailedRepository,
} from '../../repositories/payment/index.js';
import {
  createPaymentAttemptRepository,
  getPaymentAttemptByProviderPaymentIdRepository,
} from '../../repositories/paymentAttempt/index.js';
import {
  getOrderByIdRepository,
  updateOrderRepository,
} from '../../repositories/order/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const handleRazorpayWebhookService = async (webhookEvent) => {
  const { event, payload } = webhookEvent;

  if (event == 'payment.failed') {
    const razorpayPayment = payload?.payment?.entity;

    if (!razorpayPayment?.id || !razorpayPayment?.order_id) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
      );
    }

    console.log('FAILED WEBHOOK DEBUG:', {
      event,
      razorpayPaymentId: razorpayPayment?.id,
      razorpayOrderId: razorpayPayment?.order_id,
      amount: razorpayPayment?.amount,
      status: razorpayPayment?.status,
    });

    const payment = await getPaymentByProviderOrderId(razorpayPayment.order_id);

    if (!payment) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PAYMENT.NOT_FOUND);
    }

    if (payment.provider !== 'RAZORPAY') {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
      );
    }

    if (
      !Number.isFinite(razorpayPayment.amount) ||
      razorpayPayment.amount !== Math.round(payment.amount * 100) ||
      razorpayPayment.currency !== payment.currency
    ) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
      );
    }

    if (payment.status === 'SUCCESS') {
      return {
        processed: true,
        ignored: true,
        reason: 'PAYMENT_ALREADY_SUCCESSFUL',
      };
    }

    const failureReason =
      razorpayPayment.error_description ||
      razorpayPayment.error_reason ||
      razorpayPayment.error_code ||
      'Payment failed';

    const existingAttempt =
      await getPaymentAttemptByProviderPaymentIdRepository(razorpayPayment.id);

    if (existingAttempt) {
      return {
        processed: true,
        duplicate: true,
      };
    }

    try {
      if (payment.status === 'FAILED') {
        if (payment.providerPaymentId === razorpayPayment.id) {
          return { processed: true, duplicate: true };
        }

        return {
          processed: false,
          reason: 'DIFFERENT_FAILED_PAYMENT_ATTEMPT',
        };
      }

      const session = await mongoose.startSession();

      try {
        await session.withTransaction(async () => {
          await createPaymentAttemptRepository(
            {
              payment: payment._id,
              providerPaymentId: razorpayPayment.id,
              status: 'FAILED',
              failureReason,
            },
            session
          );

          const updatedPayment = await markPaymentFailedRepository({
            paymentId: payment._id,
            providerPaymentId: razorpayPayment.id,
            failureReason,
            session,
          });

          if (!updatedPayment) {
            throw new ApiError(
              HTTP_STATUS.CONFLICT,
              MESSAGES.PAYMENT.UPDATE_FAILED
            );
          }
        });
      } finally {
        await session.endSession();
      }

      return {
        processed: true,
        failed: true,
        duplicate: false,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          processed: true,
          duplicate: true,
        };
      }

      throw error;
    }
  }

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

  console.log('Payment before update:', {
    id: payment._id.toString(),
    providerOrderId: payment.providerOrderId,
    status: payment.status,
    providerPaymentId: payment.providerPaymentId,
    incomingPaymentId: razorpayPayment.id,
  });

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
