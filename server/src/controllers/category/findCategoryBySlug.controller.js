import { AsyncHandler, ApiResponse } from '../../utils/index.js';
import { findCategoryBySlugService } from '../../service/category/index.js';

const findCategoryBySlugController = AsyncHandler(async (req, res) => {
  const category = await findCategoryBySlugService(req.params.slug);

  res
    .status(200)
    .json(new ApiResponse(200, category, 'Category fetched successfully.'));
});

export default findCategoryBySlugController;
