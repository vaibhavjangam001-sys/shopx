import { getProductByIdRepository } from '../../repositories/product/index.js';
import {
  createProductVariantRepository,
  findProductVariantBySkuRepository,
} from '../../repositories/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiError } from '../../utils/index.js';

const createProductVariantService = async (productId, variantData) => {
  const existingProduct = await getProductByIdRepository(productId);

  if (!existingProduct) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.PRODUCT.NOT_FOUND);
  }

  const existingProductVariant = await findProductVariantBySkuRepository(
    variantData.sku
  );

  if (existingProductVariant) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      MESSAGES.PRODUCT_VARIANT.VARIANT_ALREADY_EXISTS
    );
  }

  const productVariant = await createProductVariantRepository({
    ...variantData,
    product: productId,
  });

  if (!productVariant) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGES.PRODUCT_VARIANT.CREATE_FAILED
    );
  }

  return productVariant;
};

export default createProductVariantService;
