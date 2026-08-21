import {
  updateProductRepository,
  getProductByIdRepository,
  findProductBySlugRepository,
} from '../../repositories/product/index.js';
import { getCategoryByIdRepository } from '../../repositories/category/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateProductService = async (productId, updateDetails) => {
  const product = await getProductByIdRepository(productId);

  if (!product) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const allowedFields = [
    'productName',
    'slug',
    'sku',
    'brand',
    'description',
    'category',
    'price',
    'discountPrice',
    'stock',
    'status',
    'isFeatured',
  ];

  const sanitizedUpdateDetails = Object.fromEntries(
    Object.entries(updateDetails).filter(([key]) => allowedFields.includes(key))
  );

  if (
    sanitizedUpdateDetails.slug &&
    sanitizedUpdateDetails.slug !== product.slug
  ) {
    const productWithSlug = await findProductBySlugRepository(
      sanitizedUpdateDetails.slug
    );

    if (productWithSlug) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.PRODUCT.SLUG_ALREADY_EXISTS
      );
    }
  }

  if (sanitizedUpdateDetails.category) {
    const isCategoryExists = await getCategoryByIdRepository(
      sanitizedUpdateDetails.category
    );

    if (!isCategoryExists) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CATEGORY.NOT_FOUND);
    }
  }

  const finalPrice = sanitizedUpdateDetails.price ?? product.price;
  const finalDiscountPrice =
    sanitizedUpdateDetails.discountPrice ?? product.discountPrice;

  if (
    finalDiscountPrice !== null &&
    finalDiscountPrice !== undefined &&
    finalDiscountPrice > finalPrice
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT.DISCOUNT_PRICE_INVALID
    );
  }

  const updatedProduct = await updateProductRepository(
    productId,
    sanitizedUpdateDetails
  );

  if (!updatedProduct) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.UPDATE_FAILED
    );
  }

  return updatedProduct;
};

export default updateProductService;
