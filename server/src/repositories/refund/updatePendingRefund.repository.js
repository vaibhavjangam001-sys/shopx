import { Refund } from '../../models/index.js';

const updatePendingRefundRepository = async (
  refundId,
  updateData,
  session = null
) => {
  return await Refund.findOneAndUpdate(
    {
      _id: refundId,
      status: 'PENDING',
    },
    {
      $set: updateData,
    },
    {
      returnDocument: 'after',
      runValidators: true,
      ...(session && { session }),
    }
  );
};

export default updatePendingRefundRepository;
