import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getAllProductsService } from '../../service/product/index.js';

const getAllProductsController = AsyncHandler(async (req, res) => {
  const products = await getAllProductsService();

  res
    .status(200)
    .json(new ApiResponse(200, products, 'Products fetched successfully.'));
});

export default getAllProductsController;
