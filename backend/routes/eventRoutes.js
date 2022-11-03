import { Router } from "express";
import {
    getAllEvents,
    getEventById,
    getEventByLocation,
    createEvent,
    updateEventById,
    deleteEventById
} from "../controller/eventController.js";

const router = new Router();

router.route("/event/").get(getAllEvents).post(createEvent);

router.route("/event/:id").get(getEventById).delete(deleteEventById).patch(updateEventById);

router.route("/search/:location").get(getEventByLocation);


export default router;