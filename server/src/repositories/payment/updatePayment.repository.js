import { Payment } from '../../models/index.js';

const updatePaymentRepository = async (
  paymentId,
  updateData,
  session = null
) => {
  return await Payment.findByIdAndUpdate(
    paymentId,
    {
      $set: updateData,
    },
    {
      returnDocument: 'after',
      runValidators: true,
      session,
    }
  );
};

export default updatePaymentRepository;
