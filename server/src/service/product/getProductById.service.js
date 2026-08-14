import { getProductByIdRepository } from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getProductByIdService = async (productId) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  return product;
};

export default getProductByIdService;
