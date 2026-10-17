import { PaymentAttempt } from '../../models/index.js';

const updatePaymentAttemptRepository = async ({
  providerPaymentId,
  status,
  failureReason = null,
  paidAt = null,
  session = null,
}) => {
  return PaymentAttempt.findOneAndUpdate(
    { providerPaymentId },
    {
      $set: {
        status,
        failureReason,
        paidAt,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default updatePaymentAttemptRepository;
