import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { deleteProductVariantService } from '../../service/productVariant/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteProdutVariantController = AsyncHandler(async (req, res) => {
  const { productVariantId } = req.params;

  const deletedProductVariant =
    await deleteProductVariantService(productVariantId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        deletedProductVariant,
        MESSAGES.PRODUCT_VARIANT.DELETED
      )
    );
});

export default deleteProdutVariantController;
