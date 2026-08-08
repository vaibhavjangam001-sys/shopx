import { AsyncHandler , ApiResponse } from "../../utils/index.js";
import { createProductService } from "../../service/product/index.js";

const createProductController = AsyncHandler(async (req, res) => {
  const product = await createProductService(req.body);

  res.status(201).json(new ApiResponse(201,product,"Product added successfully"));
});

export default createProductController;
