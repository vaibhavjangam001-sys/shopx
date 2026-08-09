import { AsyncHandler, ApiResponse } from "../../utils/index.js";
import { getCategoryByIdService } from "../../service/category/index.js";

const getCategoryByIdController = AsyncHandler(async (req, res) => {
  const category = await getCategoryByIdController(req.params.categoryId);

  res
    .status(200)
    .json(ApiResponse(200, category, "Category fetched successfully."));
});

export default getCategoryByIdController;
