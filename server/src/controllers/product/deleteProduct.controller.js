import { AsyncHandler , ApiResponse} from "../../utils/index.js"
import { deleteProductService } from "../../service/product/index.js";

const deleteProductController = AsyncHandler(async (req, res) => {
  const deletedProduct = await deleteProductService(req.params.productId);

  res
    .status(200)
    .json(
      new ApiResponse(200, deletedProduct, "Product deleted successfully."),
    );
});

export default deleteProductController;
