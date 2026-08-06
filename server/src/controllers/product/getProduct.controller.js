import AsyncHandler from "../../utils/AsyncHandler.util.js";

const getProduct = AsyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Product fetched successfully",
  });
});

export default getProduct;
