import { updateProductService } from "../../service/product/index.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import AsyncHandler from "../../utils/AsyncHandler.util.js";

const updateProductController = AsyncHandler(async (req, res) => {
  const updatedProduct = await updateProductService(
    req.params.productId,
    req.body,
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product details updated successfully.",
      ),
    );
});

export default updateProductController;
