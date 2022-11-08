import { Router } from "express";
import {
  getAllEvents,
  getEventById,
  getEventByLocation,
  createEvent,
  updateEventById,
  deleteEventById,
} from "../controller/eventController.js";
import { imageUpload } from "../middleware/imageUpload.js";
import isAuth from "../middleware/is-auth.js";
import { validator } from "../middleware/validator.js";
import { eventValidationSchema } from "../models/eventValidationModel.js";

const router = new Router();

router
  .route("/event")
  .get(getAllEvents)
  .post(isAuth, eventValidationSchema, validator, imageUpload, createEvent);

router
  .route("/event/:id")
  .get(getEventById)
  .delete(isAuth, deleteEventById)
  .patch(isAuth, updateEventById);

router.route("/search/:location").get(getEventByLocation);

export default router;
