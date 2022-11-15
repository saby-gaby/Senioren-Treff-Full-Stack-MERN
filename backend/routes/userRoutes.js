import { Router } from "express";
import {
  createUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  userLogin,
  userLogout,
  addToWatchList,
} from "../controller/userController.js";
import { userValidationSchema } from "../models/userValidationModel.js";
import { validator } from "../middleware/validator.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/user").post(userValidationSchema, validator, createUser);
router
  .route("/user/:id")
  .get(getUserByID)
  .delete(isAuth, deleteUserByID)
  .patch(isAuth, updateUserByID);
router.route("/user/login").post(userLogin);
router.route("/user/logout").post(userLogout);

router.route("/user/watchedEvents/:id").patch(isAuth, addToWatchList);

export default router;
