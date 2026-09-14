import { getProductVariantByIdRepository } from '../../repositories/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const getProductVariantByIdService = async (productVariantId) => {
  const productVariant =
    await getProductVariantByIdRepository(productVariantId);

  if (!productVariant) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      MESSAGES.PRODUCT_VARIANT.VARIANT_NOT_FOUND
    );
  }

  return productVariant;
};

export default getProductVariantByIdService;
