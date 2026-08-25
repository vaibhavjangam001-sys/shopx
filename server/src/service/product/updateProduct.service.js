import {
  updateProductRepository,
  getProductByIdRepository,
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

const updateProductService = async (productDetails) => {
  const { productId, updateDetails, images } = productDetails;
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
    finalDiscountPrice >= finalPrice
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT.DISCOUNT_PRICE_INVALID
    );
  }

  const oldImages = product.images || [];
  let uploadedImages = [];
  let updatedProduct;

  try {
    if (images?.length > 0) {
      uploadedImages = await uploadMultipleImages(
        images,
        CLOUDINARY_FOLDERS.PRODUCTS
      );

      sanitizedUpdateDetails.images = uploadedImages;
    }

    updatedProduct = await updateProductRepository(
      productId,
      sanitizedUpdateDetails
    );

    if (!updatedProduct) {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.PRODUCT.UPDATE_FAILED
      );
    }

    if (images?.length > 0 && oldImages.length > 0) {
      try {
        await deleteMultipleImages(oldImages);
      } catch (error) {
        console.error(
          'Failed to delete old product images from Cloudinary:',
          error
        );
      }
    }

    return updatedProduct;
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error);

    if (uploadedImages.length > 0) {
      await deleteMultipleImages(uploadedImages);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT.UPDATE_FAILED
    );
  }
};

export default updateProductService;
