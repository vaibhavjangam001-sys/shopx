import { getAllProductVariantsRepository } from '../../repositories/productVariant/index.js';

const getAllProductVariantsService = async (productId) => {
  const productVariants = await getAllProductVariantsRepository(productId);

  return productVariants;
};

export default getAllProductVariantsService;
