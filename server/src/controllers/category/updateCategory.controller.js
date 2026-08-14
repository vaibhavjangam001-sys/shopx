import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { updateCategoryService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const updateCategoryController = AsyncHandler(async (req, res) => {
  const updatedCategory = await updateCategoryService(
    req.params.categoryId,
    req.body
  );

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        updatedCategory,
        MESSAGES.CATEGORY.UPDATED
      )
    );
});

export default updateCategoryController;
