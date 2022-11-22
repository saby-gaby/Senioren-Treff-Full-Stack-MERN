import { body } from "express-validator";

export const eventValidationSchema = [
  body("eventTitle")
    .trim()
    .isString()
    .withMessage("eventTitle must be a String"),
  body("category").isString().not().isEmpty(),
  body("date").isDate(),
  body("time").trim().isString(),
  /* body("location").trim().toLowerCase(), */
  body("participants").isString().isLength({
    max: 2,
  }),
  body("price").isString().not().isEmpty(),
  body("description").trim().isString().isLength({
    min: 10,
    max: 2500,
  })
]   
