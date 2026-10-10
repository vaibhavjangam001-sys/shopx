import mongoose from 'mongoose';
import {
  ApiError,
  verifyRazorpaySignature,
  fetchRazorpayPayment,
} from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  getPaymentByProviderOrderId,
  updatePaymentRepository,
} from '../../repositories/payment/index.js';
import {
  getOrderByIdRepository,
  updateOrderRepository,
} from '../../repositories/order/index.js';

const verifyRazorpayPaymentService = async ({
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const payment = await getPaymentByProviderOrderId(razorpay_order_id);

  if (!payment || payment.user.toString() !== userId.toString()) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PAYMENT.NOT_FOUND);
  }

  if (payment.status === 'SUCCESS') {
    if (payment.providerPaymentId !== razorpay_payment_id) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.PAYMENT.ALREADY_COMPLETED
      );
    }

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        const order = await getOrderByIdRepository(
          payment.user,
          payment.order,
          session
        );

        if (!order) {
          throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
        }

        if (order.status === 'PENDING') {
          const updatedOrder = await updateOrderRepository(
            payment.order,
            { status: 'CONFIRMED' },
            session
          );

          if (!updatedOrder) {
            throw new ApiError(
              HTTP_STATUS.CONFLICT,
              MESSAGES.ORDER.UPDATE_FAILED
            );
          }
        } else if (order.status !== 'CONFIRMED') {
          throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.ORDER.UPDATE_FAILED
          );
        }
      });
    } finally {
      await session.endSession();
    }

    return {
      paymentId: payment._id,
      razorpayOrderId: payment.providerOrderId,
      razorpayPaymentId: payment.providerPaymentId,
      signatureVerified: true,
      paymentStatus: payment.status,
      paidAt: payment.paidAt,
    };
  }

  const isVerifySignature = verifyRazorpaySignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!isVerifySignature) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_SIGNATURE
    );
  }

  const razorpayPayment = await fetchRazorpayPayment(razorpay_payment_id);

  if (
    razorpayPayment.order_id !== payment.providerOrderId ||
    razorpayPayment.amount !== Math.round(payment.amount * 100) ||
    razorpayPayment.currency !== payment.currency
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
    );
  }

  if (razorpayPayment.status !== 'captured') {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.PAYMENT.NOT_CAPTURED);
  }

  const session = await mongoose.startSession();
  let updatedPayment;
  let updatedOrder;

  try {
    await session.withTransaction(async () => {
      updatedPayment = await updatePaymentRepository({
        paymentId: payment._id,
        providerPaymentId: razorpay_payment_id,
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
        throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.ORDER.UPDATE_FAILED);
      }

      updatedOrder = await updateOrderRepository(
        payment.order,
        {
          status: 'CONFIRMED',
        },
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

  return {
    paymentId: updatedPayment._id,
    razorpayOrderId: updatedPayment.providerOrderId,
    razorpayPaymentId: updatedPayment.providerPaymentId,
    signatureVerified: true,
    paymentStatus: updatedPayment.status,
    paidAt: updatedPayment.paidAt,
  };
};

export default verifyRazorpayPaymentService;
