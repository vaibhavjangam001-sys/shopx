import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { updateProductVariantService } from '../../service/productVariant/index.js';

const updateProductVariantController = AsyncHandler(async (req, res) => {
  const productVariantId = req.params.productVariantId;
  const productVariantUpdateDetails = req.body;

  const updatedProductVariant = await updateProductVariantService(
    productVariantId,
    productVariantUpdateDetails
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        updatedProductVariant,
        MESSAGES.PRODUCT_VARIANT.UPDATED
      )
    );
});

export default updateProductVariantController;
