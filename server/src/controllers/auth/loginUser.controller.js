import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { loginUserService } from '../../service/auth/index.js';

const loginUserController = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, MESSAGES.AUTH.LOGIN));
});

export default loginUserController;
