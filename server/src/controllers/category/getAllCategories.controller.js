import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getAllCategoriesService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getAllCategoriesController = AsyncHandler(async (req, res) => {
  const categories = await getAllCategoriesService();

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, categories, MESSAGES.CATEGORY.FETCHED_ALL)
    );
});

export default getAllCategoriesController;
