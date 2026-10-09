import { ApiError, createRazorpayOrder } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  createPaymentRepository,
  getPaymentByOrderId,
} from '../../repositories/payment/index.js';
import { getOrderByIdRepository } from '../../repositories/order/index.js';

const createRazorpayOrderService = async (userId, orderId) => {
  const order = await getOrderByIdRepository(userId, orderId);

  if (!order) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ORDER.NOT_FOUND);
  }

  if (!Number.isFinite(order.totalAmount) || order.totalAmount <= 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.ORDER.INVALID_ORDER_AMOUNT
    );
  }

  const existingPayment = await getPaymentByOrderId(order._id);

  if (existingPayment) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.PAYMENT.PAYMENT_RECORD_ALREADY_EXISTS
    );
  }

  const amountInPaise = Math.round(order.totalAmount * 100);

  const razorpayOrder = await createRazorpayOrder({
    amount: amountInPaise,
    receipt: `ShopX_${order.orderNumber}`,
    notes: {
      shopxOrderId: order._id.toString(),
      shopxOrderNo: order.orderNumber,
      userId: userId.toString(),
    },
  });

  const payment = await createPaymentRepository({
    order: order._id,
    user: userId,
    provider: 'RAZORPAY',
    providerOrderId: razorpayOrder.id,
    amount: order.totalAmount,
    currency: 'INR',
    status: 'CREATED',
  });

  return {
    paymentId: payment._id,
    shopxOrderId: order._id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  };
};

export default createRazorpayOrderService;
