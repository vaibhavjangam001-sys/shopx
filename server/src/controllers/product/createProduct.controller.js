import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { createProductService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createProductController = AsyncHandler(async (req, res) => {
  const product = await createProductService(req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(HTTP_STATUS.CREATED, product, MESSAGES.PRODUCT.CREATED)
    );
});

export default createProductController;
