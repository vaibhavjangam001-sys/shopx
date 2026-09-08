import { refreshTokenService } from '../../service/auth/index.js';
import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const refreshTokenController = AsyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await refreshTokenService(refreshToken);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        result,
        MESSAGES.AUTH.REFRESH_TOKEN_SUCCESS
      )
    );
});

export default refreshTokenController;
