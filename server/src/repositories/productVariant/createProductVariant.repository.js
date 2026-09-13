import { ProductVariant } from '../../models/index.js';

const createProductVariantRepository = async (variantData) => {
  return await ProductVariant.create(variantData);
};

export default createProductVariantRepository;
