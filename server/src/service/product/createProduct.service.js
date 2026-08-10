import {
  createProductRepository,
  findProductBySlugRepository,
} from '../../repositories/product/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';
import { ApiError } from '../../utils/index.js';

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
    throw new ApiError(409, 'Product with this slug already exists.');
  }

  const isCategoryExists = await getCategoryByIdRepository(category);

  if (!isCategoryExists) {
    throw new ApiError(404, 'Category not found.');
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
    throw new ApiError(500, 'Failed to create product.');
  }

  return createdProduct;
};

export default createProductService;
