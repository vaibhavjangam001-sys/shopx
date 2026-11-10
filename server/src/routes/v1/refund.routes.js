import { Router } from 'express';
import { ROLES } from '../../constants/index.js';

import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';

import { createRefundValidator } from '../../validators/refund/index.js';

import { createRefundController } from '../../controllers/refund/index.js';

const refundRouter = Router();

// create refund
refundRouter.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.USER),
  createRefundValidator,
  validationMiddleware,
  createRefundController
);

export default refundRouter;
