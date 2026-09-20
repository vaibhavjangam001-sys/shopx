import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { createAddressService } from '../../service/address/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';

const createAddressController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressData = req.body;

  const createdAddress = await createAddressService(userId, addressData);

  res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        createdAddress,
        MESSAGES.ADDRESS.CREATED
      )
    );
});

export default createAddressController;
