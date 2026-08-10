import { getProductByIdRepository } from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';

const getProductByIdService = async (productId) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(404, 'Product not found.');
  }

  return product;
};

export default getProductByIdService;
