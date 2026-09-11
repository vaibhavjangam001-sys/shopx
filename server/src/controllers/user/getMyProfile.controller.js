import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getMyProfileService } from '../../service/user/index.js';

const getMyProfileController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await getMyProfileService(userId);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, MESSAGES.USER.FETCHED));
});

export default getMyProfileController;
