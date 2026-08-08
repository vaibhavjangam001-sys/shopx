import { AsyncHandler , ApiResponse } from "../../utils/index.js"
import { updateProductService } from "../../service/product/index.js";


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
