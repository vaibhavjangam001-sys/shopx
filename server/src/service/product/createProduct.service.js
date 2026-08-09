import {
  createProductRepository,
  findProudctBySlugRepository,
} from "../../repositories/product/index.js";
import { ApiError } from "../../utils/index.js";

const createProductService = async (productData) => {
  const { productName, slug, brand, description, category, images, status } =
    productData;

  const existingProduct = await findProudctBySlugRepository(slug);

  if (existingProduct) {
    throw new ApiError(409, "Product with this slug already exists.");
  }

  const productDataToCreate = {
    productName,
    slug,
    brand,
    description,
    category,
    images,
    status,
  };

  const createdProduct = await createProductRepository(productDataToCreate);

  if (!createdProduct) {
    throw new ApiError(500, "Failed to create product.");
  }

  return createdProduct;
};

export default createProductService;
