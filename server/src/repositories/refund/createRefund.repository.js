import { Refund } from '../../models/index.js';

const createRefundRepository = async (refundData, session = null) => {
  const [refund] = await Refund.create([refundData], {
    ...(session && { session }),
  });

  return refund;
};

export default createRefundRepository;
