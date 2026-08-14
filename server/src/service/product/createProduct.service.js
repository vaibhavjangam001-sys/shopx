import {
  createProductRepository,
  findProductBySlugRepository,
} from '../../repositories/product/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createProductService = async (productData) => {
  const {
    productName,
    slug,
    price,
    discountPrice,
    brand,
    description,
    category,
    images,
    status,
    stock,
    sku,
  } = productData;

  const existingProduct = await findProductBySlugRepository(slug);

  if (existingProduct) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.PRODUCT.SLUG_ALREADY_EXISTS
    );
  }

  const isCategoryExists = await getCategoryByIdRepository(category);

  if (!isCategoryExists) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const productDataToCreate = {
    productName,
    slug,
    price,
    discountPrice,
    brand,
    description,
    category,
    images,
    status,
    stock,
    sku,
  };

  const createdProduct = await createProductRepository(productDataToCreate);

  if (!createdProduct) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.CREATE_FAILED
    );
  }

  return createdProduct;
};

export default createProductService;
