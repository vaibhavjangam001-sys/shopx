import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { findCategoryBySlugService } from "../../service/category/index.js";

const getCategoryBySlugController = AsyncHandler(async (req, res) => {
  const category = await getCategoryBySlugController(req.params.slug);

  res
    .status(200)
    .jons(ApiResponse(200, category, "Category fetched successfully."));
});

export default getCategoryBySlugController;
