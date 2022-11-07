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
import { validator } from "../middleware/validator.js";
import { eventValidationSchema } from "../models/eventValidationModel.js";

const router = new Router();

router
  .route("/event")
  .get(getAllEvents)
  .post(eventValidationSchema, validator, imageUpload, createEvent);

router
  .route("/event/:id")
  .get(getEventById)
  .delete(deleteEventById)
  .patch(updateEventById);

router.route("/search/:location").get(getEventByLocation);

export default router;
