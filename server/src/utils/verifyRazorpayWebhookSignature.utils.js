import crypto from 'crypto';
import { env } from '../config/index.js';

const verifyRazorpayWebhookSignature = (body, signature) => {
  if (!Buffer.isBuffer(body) || typeof signature !== 'string') {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(signature)) {
    return false;
  }

  const secret = env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error('Razorpay webhook secret is not configured');
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  const receivedBuffer = Buffer.from(signature, 'hex');

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

export default verifyRazorpayWebhookSignature;
