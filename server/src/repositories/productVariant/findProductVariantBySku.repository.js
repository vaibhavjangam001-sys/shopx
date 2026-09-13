import { ProductVariant } from '../../models/index.js';

const findProductVariantBySkuRepository = async (sku) => {
  return await ProductVariant.findOne({ sku });
};

export default findProductVariantBySkuRepository;
