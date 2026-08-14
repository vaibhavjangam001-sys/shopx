import { ApiError, ApiResponse } from '../../utils/index.js';
import { findProductBySlugRepository } from '../../repositories/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const findProductBySlugService = async (slug) => {
  const product = await findProductBySlugRepository(slug);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  return product;
};

export default findProductBySlugService;
