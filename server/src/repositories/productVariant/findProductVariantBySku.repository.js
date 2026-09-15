import { ProductVariant } from '../../models/index.js';

const findProductVariantBySkuRepository = async (sku) => {
  return await ProductVariant.findOne({
    sku,
    isDeleted: false,
  });
};

export default findProductVariantBySkuRepository;
