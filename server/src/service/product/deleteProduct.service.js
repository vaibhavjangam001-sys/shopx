import {
  deleteProductRepository,
  getProductByIdRepository,
} from '../../repositories/product/index.js';
import { ApiError } from '../../utils/index.js';

const deleteProductService = async (productId) => {
  const existingProduct = getProductByIdRepository(productId);

  if (!existingProduct) {
    throw new ApiError(404, 'Product not found.');
  }

  const deletedProduct = await deleteProductRepository(productId);

  if (!deletedProduct) {
    throw new ApiError(500, 'Failed to delete product.');
  }

  return deletedProduct;
};

export default deleteProductService;
