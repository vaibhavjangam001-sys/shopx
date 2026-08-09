import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { getAllCategoriesService } from "../../service/category/index.js";

const getAllCategoriesController = AsyncHandler(async (req, res) => {
  const categories = await getAllCategoriesService();

  res
    .status(200)
    .json(ApiResponse(200, categories, "Categories fetched successfully."));
});

export default getAllCategoriesController;
