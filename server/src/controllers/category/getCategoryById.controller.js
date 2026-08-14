import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { getCategoryByIdService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const getCategoryByIdController = AsyncHandler(async (req, res) => {
  const category = await getCategoryByIdService(req.params.categoryId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, category, MESSAGES.CATEGORY.FETCHED));
});

export default getCategoryByIdController;
