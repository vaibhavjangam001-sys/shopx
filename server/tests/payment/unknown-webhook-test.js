import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('RAZORPAY_WEBHOOK_SECRET is missing');
}

const payload = {
  entity: 'event',
  account_id: 'acc_test',
  event: 'payment.captured',
  contains: ['payment'],
  payload: {
    payment: {
      entity: {
        id: 'pay_unknown_test_123',
        entity: 'payment',
        amount: 10000000,
        currency: 'INR',
        status: 'captured',
        order_id: 'order_UNKNOWN_TEST_123',
      },
    },
  },
  created_at: Math.floor(Date.now() / 1000),
};

const rawBody = JSON.stringify(payload);

const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(rawBody)
  .digest('hex');

console.log('Payload:', rawBody);
console.log('Signature:', signature);
