import { ApiError, createRazorpayRefund } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  createRefundRepository,
  updateRefundRepository,
} from '../../repositories/refund/index.js';
import { getPaymentByIdRepository } from '../../repositories/payment/index.js';

const createRefundService = async (
  userId,
  paymentId,
  amount,
  reason = null
) => {
  const payment = await getPaymentByIdRepository(paymentId);

  if (!payment) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PAYMENT.NOT_FOUND);
  }

  if (payment.user._id.toString() !== userId.toString()) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      MESSAGES.REFUND.PAYMENT_NOT_OWNED
    );
  }

  if (payment.status !== 'SUCCESS') {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.REFUND.PAYMENT_NOT_SUCCESSFUL
    );
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.REFUND.INVALID_AMOUNT);
  }

  const remainingAmount = payment.amount - payment.refundedAmount;

  if (amount > remainingAmount) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.REFUND.AMOUNT_EXCEEDS_REMAINING
    );
  }

  if (!payment.providerPaymentId) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.PAYMENT.NOT_FOUND);
  }

  const refund = await createRefundRepository({
    payment: payment._id,
    order: payment.order._id,
    user: userId,
    provider: payment.provider,
    amount,
    currency: payment.currency,
    status: 'PENDING',
    reason,
  });

  if (!refund) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.REFUND.FAILED_REFUND
    );
  }

  const amountInPaise = Math.round(amount * 100);

  const razorpayRefund = await createRazorpayRefund({
    paymentId: payment.providerPaymentId,
    amountInPaise,
    receipt: refund._id.toString(),
    notes: {
      shopxRefundId: refund._id.toString(),
      shopxPaymentId: payment._id.toString(),
    },
  });

  if (!razorpayRefund?.id || !razorpayRefund?.status) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.SERVER.INTERNAL_ERROR
    );
  }

  const updatedRefund = await updateRefundRepository(refund._id, {
    providerRefundId: razorpayRefund.id,
  });

  if (!updatedRefund) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.SERVER.INTERNAL_ERROR
    );
  }

  return updatedRefund;
};

export default createRefundService;
