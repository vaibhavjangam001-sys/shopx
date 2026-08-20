import {
  createProductRepository,
  findProductBySlugRepository,
} from '../../repositories/product/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';
import {
  ApiError,
  deleteMultipleImages,
  uploadMultipleImages,
} from '../../utils/index.js';
import {
  HTTP_STATUS,
  MESSAGES,
  CLOUDINARY_FOLDERS,
} from '../../constants/index.js';

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
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
  }

  if (!images?.length) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT.IMAGE_REQUIRED
    );
  }

  let uploadedImages = [];

  try {
    uploadedImages = await uploadMultipleImages(
      images,
      CLOUDINARY_FOLDERS.PRODUCTS
    );

    const productDataToCreate = {
      productName,
      slug,
      price,
      discountPrice,
      brand,
      description,
      category,
      images: uploadedImages,
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
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error);
    this;
    await deleteMultipleImages(uploadedImages);
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.CREATE_FAILED
    );
  }
};
export default createProductService;
