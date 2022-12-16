import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: validationErrors.array() });
  }
};
