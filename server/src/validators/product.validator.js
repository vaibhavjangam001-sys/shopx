import { body } from "express-validator";

export const createProductValidator = [
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Product name must be between 2 and 150 characters"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Product slug is required")
    .bail()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Invalid product slug"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Brand cannot exceed 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .bail()
    .isLength({ max: 5000 })
    .withMessage("Description cannot exceed 5000 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid category ID"),
];


export default createProductValidator;