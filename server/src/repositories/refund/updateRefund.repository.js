import { Refund } from '../../models/index.js';

const updateRefundRepository = async (refundId, updateData, session = null) => {
  return await Refund.findByIdAndUpdate(
    refundId,
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

export default updateRefundRepository;
