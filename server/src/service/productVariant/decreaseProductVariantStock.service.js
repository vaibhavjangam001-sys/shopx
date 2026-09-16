import {
  decreaseProductVariantStockRepository,
  getProductVariantByIdRepository,
} from '../../repositories/productVariant/index.js';
import { ApiError } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const decreaseProductVariantStockService = async (
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

  if (productVariant.stock < quantity) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      MESSAGES.PRODUCT_VARIANT.INSUFFICIENT_STOCK
    );
  }

  const updatedProductVariant = await decreaseProductVariantStockRepository(
    productVariantId,
    quantity
  );

  return updatedProductVariant;
};

export default decreaseProductVariantStockService;
