import { decreaseProductVariantStockService } from '../../service/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';

const decreaseProductVariantStockController = AsyncHandler(async (req, res) => {
  const { productVariantId } = req.params;
  const { quantity } = req.body;

  const updatedProductVariant = await decreaseProductVariantStockService(
    productVariantId,
    quantity
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        updatedProductVariant,
        MESSAGES.PRODUCT_VARIANT.DECREASED
      )
    );
});

export default decreaseProductVariantStockController;
