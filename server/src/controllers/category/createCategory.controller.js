import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { createCategoryService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createCategoryController = AsyncHandler(async (req, res) => {
  const createdCategory = await createCategoryService(req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        createdCategory,
        MESSAGES.CATEGORY.CREATED
      )
    );
});

export default createCategoryController;
