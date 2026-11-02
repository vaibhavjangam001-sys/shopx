import { Payment } from '../../models/index.js';

const markPaymentFailedRepository = async ({
  paymentId,
  failureReason,
  session = null,
}) => {
  return Payment.findOneAndUpdate(
    {
      _id: paymentId,
      status: { $in: ['CREATED', 'PENDING', 'FAILED'] },
      providerPaymentId: null,
    },
    {
      $set: {
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
