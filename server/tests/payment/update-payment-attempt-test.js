import mongoose from 'mongoose';
import connectDB from '../../src/config/db.config.js';

import { Payment, PaymentAttempt } from '../../src/models/index.js';

import { updatePaymentAttemptRepository } from '../../src/repositories/paymentAttempt/index.js';

const runTest = async () => {
  let testProviderPaymentId;

  try {
    await connectDB();

    const payment = await Payment.findById('6ae9e6ca213662f2e690c4b8');

    if (!payment) {
      throw new Error('Test Payment not found');
    }

    testProviderPaymentId = `TEST_UPDATE_${Date.now()}`;

    await PaymentAttempt.create({
      payment: payment._id,
      providerPaymentId: testProviderPaymentId,
      status: 'FAILED',
      failureReason: 'Temporary test failure',
      paidAt: null,
    });

    console.log('Before update: FAILED');

    const paidAt = new Date();

    const updatedAttempt = await updatePaymentAttemptRepository({
      providerPaymentId: testProviderPaymentId,
      status: 'SUCCESS',
      failureReason: null,
      paidAt,
    });

    if (
      !updatedAttempt ||
      updatedAttempt.status !== 'SUCCESS' ||
      updatedAttempt.failureReason !== null ||
      !updatedAttempt.paidAt
    ) {
      throw new Error('PaymentAttempt update test failed');
    }

    console.log('After update:', updatedAttempt.status);
    console.log('Failure reason:', updatedAttempt.failureReason);
    console.log('Paid At:', updatedAttempt.paidAt);

    console.log('✅ UPDATE PAYMENT ATTEMPT TEST PASSED');
  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  } finally {
    if (testProviderPaymentId) {
      await PaymentAttempt.deleteOne({
        providerPaymentId: testProviderPaymentId,
      });
    }

    await mongoose.disconnect();
    console.log('Database disconnected');
  }
};

runTest();
