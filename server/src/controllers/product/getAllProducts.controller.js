import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getAllProductsService } from '../../service/product/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getAllProductsController = AsyncHandler(async (req, res) => {
  const products = await getAllProductsService(req.query);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, products, MESSAGES.PRODUCT.FETCHED_ALL)
    );
});

export default getAllProductsController;
