import AsyncHandler from "../../utils/AsyncHandler.util.js";

const getProducts = AsyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Products fetched successfully",
  });
});

export default getProducts;
