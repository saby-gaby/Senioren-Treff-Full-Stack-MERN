import { Router } from "express";
import {
  createUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
} from "../controller/userController.js";
import { userValidationSchema } from "../models/userValidationModel.js";
import { validator } from "../middleware/validator.js";

const router = Router();

router.route("/user").post(userValidationSchema, validator, createUser);
router
  .route("/user/:id")
  .get(getUserByID)
  .delete(deleteUserByID)
  .patch(updateUserByID);

export default router;
