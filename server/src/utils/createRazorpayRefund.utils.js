import { razorpay } from '../config/index.js';

const createRazorpayRefund = async ({
  paymentId,
  amountInPaise,
  receipt,
  notes = {},
}) => {
  return await razorpay.payments.refund(paymentId, {
    amount: amountInPaise,
    speed: 'normal',
    receipt,
    notes,
  });
};

export default createRazorpayRefund;
