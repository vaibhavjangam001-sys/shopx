import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { deleteCategoryService } from '../../service/category/index.js';

const deleteCategoryController = AsyncHandler(async (req, res) => {
  const deletedCategory = await deleteCategoryService(req.params.categoryId);

  res
    .status(200)
    .json(
      new ApiResponse(200, deletedCategory, 'Category deleted successfully.')
    );
});

export default deleteCategoryController;
