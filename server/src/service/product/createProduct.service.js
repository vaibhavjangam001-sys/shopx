import { createProductRepository } from "../../repositories/product/index.js";
import { ApiError } from "../../utils/index.js";

const createProductService = async (productData) => {
  const product = await createProductRepository(productData);

  if (!product) {
    throw new ApiError(500, "Failed to create product.");
  }

  return product;
};

export default createProductService;
