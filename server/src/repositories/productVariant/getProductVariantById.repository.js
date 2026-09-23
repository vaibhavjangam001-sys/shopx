import { ProductVariant } from '../../models/index.js';

const getProductVariantByIdRepository = async (productVariantId) => {
  return await ProductVariant.findOne({
    _id: productVariantId,
    isDeleted: false,
  }).populate({
    path: 'product',
    select: 'productName',
  });
};

export default getProductVariantByIdRepository;
