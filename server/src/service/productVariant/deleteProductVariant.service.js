import { ApiError } from '../../utils/index.js';
import {
  deleteProductVariantRepository,
  getProductVariantByIdRepository,
} from '../../repositories/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteProductVariantService = async (productVariantId) => {
  const productVariantExists =
    await getProductVariantByIdRepository(productVariantId);

  if (!productVariantExists) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  const deletedProductVariant =
    await deleteProductVariantRepository(productVariantId);

  if (!deletedProductVariant) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT_VARIANT.DELETE_FAILED
    );
  }

  return deletedProductVariant;
};

export default deleteProductVariantService;
