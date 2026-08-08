import AsyncHandler from "../../utils/AsyncHandler.util.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import { deleteProductService } from "../../service/product/index.js";

const deletedProductController = AsyncHandler(async (req, res) => {
  const deletedProduct = await deleteProductService(req.params.productId);

  res
    .status(200)
    .json(
      new ApiResponse(200, deletedProduct, "Product deleted successfully."),
    );
});

export default deletedProductController;
