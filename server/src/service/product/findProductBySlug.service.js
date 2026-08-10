import { ApiError, ApiResponse } from '../../utils/index.js';
import { findProudctBySlugRepository } from '../../repositories/product/index.js';

const findProductBySlugService = async (slug) => {
  const product = await findProudctBySlugRepository(slug);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  return product;
};

export default findProductBySlugService;
