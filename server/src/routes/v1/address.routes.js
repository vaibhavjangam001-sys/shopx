import { Router } from 'express';
import {
  authenticationMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import {
  createAddressValidator,
  deleteAddressValidator,
  getAddressByIdValidator,
  setDefaultAddressValidator,
  updateAddressValidator,
} from '../../validators/address/index.js';
import {
  createAddressController,
  deleteAddressController,
  getAddressByIdController,
  getMyAddressesController,
  setDefaultAddressController,
  updateAddressController,
} from '../../controllers/address/index.js';

const addressRouter = Router();

// set default address :-
addressRouter.patch(
  '/:addressId/default',
  authenticationMiddleware,
  setDefaultAddressValidator,
  validationMiddleware,
  setDefaultAddressController
);

// get address by id :-
addressRouter.get(
  '/:addressId',
  authenticationMiddleware,
  getAddressByIdValidator,
  validationMiddleware,
  getAddressByIdController
);

// get all addresses :-
addressRouter.get('/', authenticationMiddleware, getMyAddressesController);

// create new user address :-
addressRouter.post(
  '/',
  authenticationMiddleware,
  createAddressValidator,
  validationMiddleware,
  createAddressController
);

// update address :-
addressRouter.patch(
  '/:addressId',
  authenticationMiddleware,
  updateAddressValidator,
  validationMiddleware,
  updateAddressController
);

// delete address :-
addressRouter.delete(
  '/:addressId',
  authenticationMiddleware,
  deleteAddressValidator,
  validationMiddleware,
  deleteAddressController
);

export default addressRouter;
