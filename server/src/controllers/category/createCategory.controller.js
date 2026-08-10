import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { createCategoryService } from '../../service/category/index.js';

const createCategoryController = AsyncHandler(async (req, res) => {
  const createdCategory = await createCategoryService(req.body);

  res
    .status(201)
    .json(
      new ApiResponse(201, createdCategory, 'Category created successfully.')
    );
});

export default createCategoryController;
