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
  updatePaymentAttemptRepository,
} from '../../repositories/paymentAttempt/index.js';
import {
  getOrderByIdRepository,
  updateOrderRepository,
} from '../../repositories/order/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const handleRazorpayWebhookService = async (webhookEvent) => {
  const { event, payload } = webhookEvent;

  if (event === 'payment.failed') {
    const razorpayPayment = payload?.payment?.entity;

    if (
      !razorpayPayment?.id ||
      !razorpayPayment?.order_id ||
      razorpayPayment.status !== 'failed'
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

    // Successful payment must never become FAILED.
    if (payment.status === 'SUCCESS') {
      return {
        processed: true,
        ignored: true,
        reason: 'PAYMENT_ALREADY_SUCCESSFUL',
      };
    }

    const existingAttempt =
      await getPaymentAttemptByProviderPaymentIdRepository(razorpayPayment.id);

    // Duplicate webhook protection.
    if (existingAttempt) {
      return {
        processed: true,
        duplicate: true,
      };
    }

    const failureReason =
      razorpayPayment.error_description ||
      razorpayPayment.error_reason ||
      razorpayPayment.error_code ||
      'Payment failed';

    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        // Save every unique failed attempt.
        await createPaymentAttemptRepository(
          {
            payment: payment._id,
            providerPaymentId: razorpayPayment.id,
            status: 'FAILED',
            failureReason,
          },
          session
        );

        // Update overall Payment status.
        const updatedPayment = await markPaymentFailedRepository({
          paymentId: payment._id,
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
    } catch (error) {
      if (error.code === 11000) {
        return {
          processed: true,
          duplicate: true,
        };
      }

      throw error;
    } finally {
      await session.endSession();
    }

    return {
      processed: true,
      failed: true,
      duplicate: false,
    };
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
      const paidAt = new Date();

      // 1. Check whether this payment attempt already exists.
      const existingAttempt =
        await getPaymentAttemptByProviderPaymentIdRepository(
          razorpayPayment.id,
          session
        );

      if (existingAttempt) {
        // Ensure attempt belongs to the same Payment.
        if (existingAttempt.payment.toString() !== payment._id.toString()) {
          throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.PAYMENT.ALREADY_COMPLETED
          );
        }

        // 2. Update existing attempt.
        const updatedAttempt = await updatePaymentAttemptRepository({
          providerPaymentId: razorpayPayment.id,
          status: 'SUCCESS',
          failureReason: null,
          paidAt,
          session,
        });

        if (!updatedAttempt) {
          throw new ApiError(
            HTTP_STATUS.CONFLICT,
            MESSAGES.PAYMENT.UPDATE_FAILED
          );
        }
      } else {
        // 3. Create new successful attempt.
        await createPaymentAttemptRepository(
          {
            payment: payment._id,
            providerPaymentId: razorpayPayment.id,
            status: 'SUCCESS',
            failureReason: null,
            paidAt,
          },
          session
        );
      }

      // 4. Update main Payment document.
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

      // 5. Find Order.
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

      // 6. Confirm Order.
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
