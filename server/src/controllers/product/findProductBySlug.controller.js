import { ApiError, ApiResponse, AsyncHandler } from '../../utils/index.js';
import { findProductBySlugService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const findProductBySlugController = AsyncHandler(async (req, res) => {
  const proudct = await findProductBySlugService(req.params.slug);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, proudct, MESSAGES.PRODUCT.FETCHED));
});

export default findProductBySlugController;
