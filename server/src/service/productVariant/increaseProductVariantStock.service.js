import {
  getProductVariantByIdRepository,
  increaseProductVariantStockRepository,
} from '../../repositories/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const increaseProductVariantStockService = async (
  productVariantId,
  quantity
) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT_VARIANT.INVALID_QUANTITY
    );
  }

  const productVariant =
    await getProductVariantByIdRepository(productVariantId);

  if (!productVariant) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  const updatedProductVariant = await increaseProductVariantStockRepository(
    productVariantId,
    quantity
  );

  if (!updatedProductVariant) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT_VARIANT.FAILED_TO_INCREASE_STOCK
    );
  }

  return updatedProductVariant;
};

export default increaseProductVariantStockService;
