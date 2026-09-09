import { Router } from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  findCategoryBySlugController,
} from '../../controllers/category/index.js';
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  findCategoryBySlugValidator,
  findCategoryByIdValidator,
  categoryQueryValidator,
} from '../../validators/category/index.js';
import {
  authenticationMiddleware,
  authorizeMiddleware,
  validationMiddleware,
} from '../../middlewares/index.js';
import { ROLES } from '../../constants/index.js';

const categoryRouter = Router();

// find category by slug
categoryRouter.get(
  '/slug/:slug',
  findCategoryBySlugValidator,
  validationMiddleware,
  findCategoryBySlugController
);

// get all categories
categoryRouter.get(
  '/',
  categoryQueryValidator,
  validationMiddleware,
  getAllCategoriesController
);

// get category by id
categoryRouter.get(
  '/:categoryId',
  findCategoryByIdValidator,
  validationMiddleware,
  getCategoryByIdController
);

// create category
categoryRouter.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  createCategoryValidator,
  validationMiddleware,
  createCategoryController
);

// update category
categoryRouter.patch(
  '/:categoryId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  updateCategoryValidator,
  validationMiddleware,
  updateCategoryController
);

// delete category
categoryRouter.delete(
  '/:categoryId',
  authenticationMiddleware,
  authorizeMiddleware(ROLES.ADMIN),
  deleteCategoryValidator,
  validationMiddleware,
  deleteCategoryController
);

export default categoryRouter;
