import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
  findProductVariantBySkuRepository,
  getProductVariantByIdRepository,
  updateProductVariantRepository,
} from '../../repositories/productVariant/index.js';

const updateProductVariantService = async (
  productVariantId,
  productVariantUpdateDetails
) => {
  const productVariantExists =
    await getProductVariantByIdRepository(productVariantId);

  if (!productVariantExists) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  if (
    productVariantUpdateDetails.sku &&
    productVariantUpdateDetails.sku !== productVariantExists.sku
  ) {
    const existingSkuVariant = await findProductVariantBySkuRepository(
      productVariantUpdateDetails.sku
    );

    if (existingSkuVariant) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.PRODUCT_VARIANT.VARIANT_SKU_ALREADY_EXISTS
      );
    }
  }

  const finalPrice =
    productVariantUpdateDetails.price ?? productVariantExists.price;

  const finalDicountPrice =
    productVariantUpdateDetails.discountPrice ??
    productVariantExists.discountPrice;

  if (
    finalDicountPrice !== null &&
    finalDicountPrice !== undefined &&
    finalDicountPrice > finalPrice
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT_VARIANT.DISCOUNT_PRICE_INVALID
    );
  }

  const updatedProductVariant = await updateProductVariantRepository(
    productVariantId,
    productVariantUpdateDetails
  );

  if (!updatedProductVariant) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT_VARIANT.UPDATE_FAILED
    );
  }

  return updatedProductVariant;
};

export default updateProductVariantService;
