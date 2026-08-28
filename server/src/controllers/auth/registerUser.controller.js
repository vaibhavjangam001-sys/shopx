import { registerUserService } from '../../service/auth/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const registerUserController = AsyncHandler(async (req, res) => {
  const registeredUserData = await registerUserService(req.body);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        registeredUserData,
        MESSAGES.AUTH.REGISTERED
      )
    );
});

export default registerUserController;
