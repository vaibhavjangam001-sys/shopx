import 'dotenv/config';
import crypto from 'crypto';

const orderId = 'order_TvkpQX12N12yZ0';
const paymentId = 'pay_TvkrGmLLR0jpBE';

const signature = crypto
  .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  .update(`${orderId}|${paymentId}`)
  .digest('hex');

console.log('Generated Signature:', signature);
