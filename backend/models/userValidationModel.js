import { body, check } from "express-validator";

export const userValidationSchema = [
    body("userName")
        .trim()
        .isString()
        .not().isEmpty()
        .isLength({ min: 4, max: 20 })
        .withMessage("Has to have at least 4 Characters and max 20 Characters"),
    body("firstName")
        .trim()
        .not().isEmpty()
        .isString(),
    body("lastName")
        .trim()
        .not().isEmpty()
        .isString(),
    body("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .not().isEmpty()
        .withMessage("Has to be a valid email"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("min 8 chararackters")
        .not().isEmpty(),
        // ({
        //   minLength: 8,
        //   minLowercase: 1,
        //   minUppercase: 1,
        //   minNumbers: 1,
        //   returnScore: true,
        //   pointsPerUnique: 1,
        //   pointsPerRepeat: 0.5,
        //   pointsForContainingLower: 10,
        //   pointsForContainingUpper: 10,
        //   pointsForContainingNumber: 10,
        //   pointsForContainingSymbol: 10,
        // }),
    body("location")
        .trim()
        .isString()
        .not().isEmpty()
    ]