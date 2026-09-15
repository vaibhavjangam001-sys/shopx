import { ProductVariant } from '../../models/index.js';

const getProductVariantByIdRepository = async (productVariantId) => {
  return await ProductVariant.findOne({
    _id: productVariantId,
    isDeleted: false,
  });
};

export default getProductVariantByIdRepository;
