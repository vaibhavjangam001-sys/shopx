import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { updateProductService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateProductController = AsyncHandler(async (req, res) => {
  const updatedProduct = await updateProductService(
    req.params.productId,
    req.body
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, updatedProduct, MESSAGES.PRODUCT.UPDATED)
    );
});

export default updateProductController;
