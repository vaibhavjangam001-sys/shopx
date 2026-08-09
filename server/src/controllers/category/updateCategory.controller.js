import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { updateCategoryService } from "../../service/category/index.js";

const updateCategoryController = AsyncHandler(async (req, res) => {
  const updatedCategory = await updateCategoryService(
    req.params.categoryId,
    req.body,
  );

  res
    .status(200)
    .json(ApiResponse(200, updatedCategory, "Category updated successfully."));
});

export default updateCategoryController;
