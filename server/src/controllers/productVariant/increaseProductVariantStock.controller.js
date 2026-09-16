import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { increaseProductVariantStockService } from '../../service/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const increaseProductVariantStockController = AsyncHandler(async (req, res) => {
  const { productVariantId } = req.params;
  const { quantity } = req.body;

  const updatedProductVariant = await increaseProductVariantStockService(
    productVariantId,
    quantity
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        updatedProductVariant,
        MESSAGES.PRODUCT_VARIANT.INCREASED
      )
    );
});

export default increaseProductVariantStockController;
