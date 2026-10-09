import { razorpay } from '../config/index.js';

const createRazorOrder = async ({ amount, receipt, notes }) => {
  return razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt,
    notes,
  });
};

export default createRazorOrder;
