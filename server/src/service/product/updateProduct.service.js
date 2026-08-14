import {
  updateProductRepository,
  getProductByIdRepository,
  findProductBySlugRepository,
} from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateProductService = async (productId, updateDetails) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  if (updateDetails.slug && updateDetails.slug !== product.slug) {
    const productWithSlug = await findProductBySlugRepository(
      updateDetails.slug
    );

    if (productWithSlug) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.PRODUCT.SLUG_ALREADY_EXISTS
      );
    }
  }

  const updatedProduct = await updateProductRepository(
    productId,
    updateDetails
  );

  if (!updatedProduct) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.UPDATE_FAILED
    );
  }

  return updatedProduct;
};

export default updateProductService;
