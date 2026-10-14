import { Payment } from '../../models/index.js';

const markPaymentFailedRepository = async ({
  paymentId,
  providerPaymentId,
  failureReason,
  session,
}) => {
  return await Payment.findOneAndUpdate(
    {
      _id: paymentId,
      status: { $in: ['CREATED', 'PENDING'] },
      providerPaymentId: null,
    },
    {
      $set: {
        providerPaymentId,
        status: 'FAILED',
        failureReason: failureReason || 'Payment failed',
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default markPaymentFailedRepository;
