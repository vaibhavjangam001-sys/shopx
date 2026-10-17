import { Payment } from '../../models/index.js';

const updatePaymentRepository = async ({
  paymentId,
  providerPaymentId,
  session = null,
}) => {
  return Payment.findOneAndUpdate(
    {
      _id: paymentId,
      status: { $in: ['CREATED', 'PENDING'] },
      providerPaymentId: null,
    },
    {
      $set: {
        providerPaymentId,
        status: 'SUCCESS',
        paidAt: new Date(),
        failureReason: null,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default updatePaymentRepository;
