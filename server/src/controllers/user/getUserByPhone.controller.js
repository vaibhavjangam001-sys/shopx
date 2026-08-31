import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { getUserByPhoneService } from '../../service/user/index.js';

const getUserByPhoneController = AsyncHandler(async (req, res) => {
  const user = await getUserByPhoneService(req.params.phoneNumber);

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse(HTTP_STATUS.OK, user, MESSAGES.USER.FETCHED));
});

export default getUserByPhoneController;
