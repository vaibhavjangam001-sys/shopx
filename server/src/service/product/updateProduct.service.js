import {
  updateProductRepository,
  getProductByIdRepository,
  findProudctBySlugRepository
} from "../../repositories/product/index.js";
import { ApiError } from "../../utils/index.js";

const updateProductService = async (productId, updateDetails) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(404,"Product not found.");
  }

  if(updateDetails.slug && updateDetails.slug !== product.slug) {
    const productWithSlug = await findProudctBySlugRepository(updateDetails.slug);

    if(productWithSlug) {
      throw new ApiError(
        409,
        "Product with this slug aready exists."
      )
    }
  }

  const updatedProduct = await updateProductRepository(
    productId,
    updateDetails,
  );

  if(!updatedProduct) {
    throw new ApiError(
      500,
      "Failed to update product."
    )
  }

  return updatedProduct;
};

export default updateProductService;
