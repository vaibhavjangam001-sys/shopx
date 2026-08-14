import {
  deleteProductRepository,
  getProductByIdRepository,
} from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteProductService = async (productId) => {
  const existingProduct = await getProductByIdRepository(productId);

  if (!existingProduct) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const deletedProduct = await deleteProductRepository(productId);

  if (!deletedProduct) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.DELETE_FAILED
    );
  }

  return deletedProduct;
};

export default deleteProductService;
