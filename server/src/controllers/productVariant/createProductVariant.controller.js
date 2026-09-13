import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { createProductVariantService } from '../../service/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createProductVariantController = AsyncHandler(async (req, res) => {
  const productVariant = await createProductVariantService(
    req.params.productId,
    req.body
  );

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        productVariant,
        MESSAGES.PRODUCT_VARIANT.CREATED
      )
    );
});

export default createProductVariantController;
