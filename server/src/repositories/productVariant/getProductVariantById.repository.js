import { ProductVariant } from '../../models/index.js';

const getProductVariantByIdRepository = async (productVariantId, session) => {
  return await ProductVariant.findOne({
    _id: productVariantId,
    isDeleted: false,
  })
    .populate({
      path: 'product',
      select: 'productName',
    })
    .session(session);
};

export default getProductVariantByIdRepository;
