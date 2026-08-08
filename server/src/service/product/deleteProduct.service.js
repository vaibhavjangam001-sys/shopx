import {
  deleteProductRepository,
  getProductRepository,
} from "../../repositories/product/index.js";

const deleteProductService = async (productId) => {
  const product = await getProductRepository(productId);

  if (!product) {
    return null;
  }

  const deletedProduct = await deleteProductRepository(productId);

  return deletedProduct;
};

export default deleteProductService;
