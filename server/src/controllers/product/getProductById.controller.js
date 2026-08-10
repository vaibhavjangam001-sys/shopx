import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getProductByIdService } from '../../service/product/index.js';

const getProductByIdController = AsyncHandler(async (req, res) => {
  const product = await getProductByIdService(req.params.productId);

  res
    .status(200)
    .json(new ApiResponse(200, product, 'Product fetched successfully.'));
});

export default getProductByIdController;
