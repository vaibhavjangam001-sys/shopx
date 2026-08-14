import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { deleteCategoryService } from '../../service/category/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const deleteCategoryController = AsyncHandler(async (req, res) => {
  const deletedCategory = await deleteCategoryService(req.params.categoryId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        deletedCategory,
        MESSAGES.CATEGORY.DELETED
      )
    );
});

export default deleteCategoryController;
