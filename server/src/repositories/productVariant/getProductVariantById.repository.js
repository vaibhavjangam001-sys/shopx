import { ProductVariant } from '../../models/index.js';

const getProductVariantByIdRepository = async (productVariantId) => {
  return await ProductVariant.findById(productVariantId);
};

export default getProductVariantByIdRepository;
