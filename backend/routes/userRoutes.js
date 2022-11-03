import { Router } from "express";
import {
  createUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
} from "../controller/userController.js";

const router = Router();

router.route("/").post(createUser);
router
  .route("/:id")
  .get(getUserByID)
  .delete(deleteUserByID)
  .patch(updateUserByID);

export default router;
