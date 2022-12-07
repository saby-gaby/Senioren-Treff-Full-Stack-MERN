import { Router } from "express";
import {
  createUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  userLogin,
  userLogout,
  addToWatchList,
  getUserByUsername,getUserByEmail
} from "../controller/userController.js";
import { userValidationSchema } from "../models/userValidationModel.js";
import { updateUserValidationSchema } from "../models/updateUserValidationSchema.js";
import { validator } from "../middleware/validator.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/user").post(userValidationSchema, validator, createUser);
router
  .route("/user/:id")
  .get(getUserByID)
  .delete(isAuth, deleteUserByID)
  .patch(isAuth, updateUserValidationSchema, validator, updateUserByID);
router.route("/user/login").post(userLogin);
router.route("/user/logout").post(userLogout);
router.route("/user/username/:username").get(getUserByUsername);
router.route("/user/email/:email").get(getUserByEmail);

router.route("/user/watchedEvents/:id").patch(isAuth, addToWatchList);

export default router;
