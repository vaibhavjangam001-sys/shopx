import { PaymentAttempt } from '../../models/index.js';

const updatePaymentAttemptRepository = async ({
  providerPaymentId,
  status,
  failureReason,
  paidAt,
  session = null,
}) => {
  if (!providerPaymentId) {
    return null;
  }

  const updateFields = {};

  if (status !== undefined) {
    updateFields.status = status;
  }

  if (failureReason !== undefined) {
    updateFields.failureReason = failureReason;
  }

  if (paidAt !== undefined) {
    updateFields.paidAt = paidAt;
  }

  if (Object.keys(updateFields).length === 0) {
    return null;
  }

  return PaymentAttempt.findOneAndUpdate(
    { providerPaymentId },
    {
      $set: updateFields,
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default updatePaymentAttemptRepository;
