import AsyncHandler from "../../utils/AsyncHandler.util.js"

const registerUser = AsyncHandler(async (req,res) => {
    res.status(200).json({
    message: "User registered successfully",
  });
})

export default registerUser;