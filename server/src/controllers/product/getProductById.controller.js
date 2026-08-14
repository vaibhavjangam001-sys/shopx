import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getProductByIdService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getProductByIdController = AsyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.productId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, product, MESSAGES.PRODUCT.FETCHED));
});

export default getProductByIdController;
