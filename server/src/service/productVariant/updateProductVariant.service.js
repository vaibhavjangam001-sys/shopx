import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import {
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
