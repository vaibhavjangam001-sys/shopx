import { getProductRepository } from "../../repositories/product/index.js";
import { ApiError } from "../../utils/index.js"

const getProductService = async (productId) => {

  const product = await getProductRepository(productId);

  if (!product) {
    throw new ApiError(404,"Product not found.");
  }

  return product;
};

export default getProductService;
