import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getAllProductVariantsService } from '../../service/productVariant/index.js';

const getAllProductVariantsController = AsyncHandler(async (req, res) => {
  const { productId } = req.params;

  const productVariants = await getAllProductVariantsService(productId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        productVariants,
        MESSAGES.PRODUCT_VARIANT.FETCHED_ALL
      )
    );
});

export default getAllProductVariantsController;
