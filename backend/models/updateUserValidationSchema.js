import { body } from "express-validator";

export const updateUserValidationSchema = [
  body("userName")
    .trim()
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 4, max: 20 })
    .withMessage("Has to have at least 4 Characters and max 20 Characters"),
  body("firstName").trim().not().isEmpty().isString(),
  body("lastName").trim().not().isEmpty().isString(),
  body("gender").isString().not().isEmpty(),
  body("disabilities").trim().isString().isLength({ max: 250 }),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Has to be a valid email"),
  body("location").trim().isString().not().isEmpty(),
];
