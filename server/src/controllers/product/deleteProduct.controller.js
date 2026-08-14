import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { deleteProductService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteProductController = AsyncHandler(async (req, res) => {
  const deletedProduct = await deleteProductService(req.params.productId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, deletedProduct, MESSAGES.PRODUCT.DELETED)
    );
});

export default deleteProductController;
