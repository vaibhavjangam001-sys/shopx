import { ApiResponse, AsyncHandler } from '../../utils/index.js';
import { HTTP_STATUS, MESSAGES } from '../../constants/index.js';
import { setDefaultAddressService } from '../../service/address/index.js';

const setDefaultAddressController = AsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.addressId;

  const setDefaultAddress = await setDefaultAddressService(userId, addressId);

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        setDefaultAddress,
        MESSAGES.ADDRESS.SET_SUCCESS
      )
    );
});

export default setDefaultAddressController;
