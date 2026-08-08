import AsyncHandler from "../../utils/AsyncHandler.util.js";
import { getProductService } from "../../service/product/index.js";
import ApiResponse from "../../utils/ApiResponse.util.js";

const getProductController = AsyncHandler(async (req, res) => {
  const product = await getProductService(req.params.productId);

  if (!product) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Product not found."));
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully."));
});

export default getProductController;
