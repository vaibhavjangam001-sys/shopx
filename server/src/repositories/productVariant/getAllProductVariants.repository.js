import { ProductVariant } from '../../models/index.js';

const getAllProductVariantsRepository = async (productId) => {
  return await ProductVariant.find({
    product: productId,
    isDeleted: false,
  });
};

export default getAllProductVariantsRepository;
