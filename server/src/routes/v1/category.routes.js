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
  updateCategoryValidator,
} from '../../validators/category/index.js';
import { validationMiddleware } from '../../middlewares/index.js';

const categoryRouter = Router();

// find category by slug
categoryRouter.get('/slug/:slug', findCategoryBySlugController);

// get all categories
categoryRouter.get('/', getAllCategoriesController);

// get category by id
categoryRouter.get('/:categoryId', getCategoryByIdController);

// create category
categoryRouter.post(
  '/',
  createCategoryValidator,
  validationMiddleware,
  createCategoryController
);

// update category
categoryRouter.patch(
  '/:categoryId',
  updateCategoryValidator,
  validationMiddleware,
  updateCategoryController
);

// delete category
categoryRouter.delete('/:categoryId', deleteCategoryController);

export default categoryRouter;
