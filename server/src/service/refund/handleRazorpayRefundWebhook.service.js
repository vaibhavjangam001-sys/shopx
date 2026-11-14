import mongoose from 'mongoose';
import { ApiError } from '../../utils/index.js';
import {
  getPaymentByProviderOrderId,
  updatePaymentRepository,
  markPaymentFailedRepository,
  updatePaymentRefundRepository,
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
import {
  getRefundByProviderRefundIdRepository,
  updatePendingRefundRepository,
} from '../../repositories/refund/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const handleRazorpayRefundWebhookService = async (event, payload) => {
  const razorpayRefund = payload?.refund?.entity;

  if (
    !razorpayRefund?.id ||
    !razorpayRefund?.payment_id ||
    !Number.isFinite(razorpayRefund.amount) ||
    !razorpayRefund.currency
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
    );
  }

  const refund = await getRefundByProviderRefundIdRepository(razorpayRefund.id);

  if (!refund) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.REFUND.NOT_FOUND);
  }

  if (
    refund.provider !== 'RAZORPAY' ||
    razorpayRefund.amount !== Math.round(refund.amount * 100) ||
    razorpayRefund.currency !== refund.currency
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
    );
  }

  const session = await mongoose.startSession();

  let result;

  try {
    await session.withTransaction(async () => {
      if (event === 'refund.processed') {
        if (razorpayRefund.status !== 'processed') {
          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.PAYMENT.INVALID_PAYMENT_DETAILS
          );
        }

        const updatedRefund = await updatePendingRefundRepository(
          refund._id,
          {
            status: 'PROCESSED',
            processedAt: new Date(),
            failuerReason: null,
          },
          session
        );

        if (!updatedRefund) {
          result = {
            processed: true,
            duplicate: true,
          };

          return;
        }
      }
    });
  } finally {
  }
};
