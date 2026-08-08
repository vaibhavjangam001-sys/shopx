import { AsyncHandler , ApiResponse } from "../../utils/index.js";
import { getProductService } from "../../service/product/index.js";


const getProductController = AsyncHandler(async (req, res) => {
  const product = await getProductService(req.params.productId);

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully."));
});

export default getProductController;
