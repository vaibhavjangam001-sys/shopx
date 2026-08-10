import { ApiError, ApiResponse, AsyncHandler } from '../../utils/index.js';
import { findProductBySlugService } from '../../service/product/index.js';

const findProductBySlugController = AsyncHandler(async (req, res) => {
  const proudct = await findProductBySlugService(req.params.slug);

  res
    .status(200)
    .json(new ApiResponse(200, proudct, 'Product fetched successfully.'));
});

export default findProductBySlugController;
