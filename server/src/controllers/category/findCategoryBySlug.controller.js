import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { findCategoryBySlugService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const findCategoryBySlugController = AsyncHandler(async (req, res) => {
  const category = await findCategoryBySlugService(req.params.slug);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, category, MESSAGES.CATEGORY.FETCHED));
});

export default findCategoryBySlugController;
