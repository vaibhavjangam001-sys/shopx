import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { getProductVariantByIdService } from '../../service/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getProductVariantByIdController = AsyncHandler(async (req, res) => {
  const { productVariantId } = req.params;

  const productVariant = await getProductVariantByIdService(productVariantId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        productVariant,
        MESSAGES.PRODUCT_VARIANT.FETCHED
      )
    );
});

export default getProductVariantByIdController;
