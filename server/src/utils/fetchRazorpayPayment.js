import { razorpay } from '../config/index.js';

const fetchRazorpayPayment = async (paymentId) => {
  return await razorpay.payments.fetch(paymentId);
};

export default fetchRazorpayPayment;
