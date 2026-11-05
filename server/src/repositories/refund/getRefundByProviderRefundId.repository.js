import { Refund } from '../../models/index.js';

const getRefundByProviderRefundIdRepository = async (
  providerRefundId,
  session = null
) => {
  return await Refund.findOne({
    providerRefundId,
  }).session(session);
};

export default getRefundByProviderRefundIdRepository;
