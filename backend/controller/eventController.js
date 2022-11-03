import EventModel from "../models/EventModel.js";

export const getAllEvents = async (req, res) => {
    try {
        const allEvents = await EventModel.find({});
        res.status(200).send(allEvents);
    } catch (error) {
        res.status(404).send(error.message);
    };
};

export const getEventByLocation = async (req, res) => {
    try {
        const getEvents = await EventModel.find({ "location": req.params.location });
        res.status(200).send(getEvents)
    } catch (error) {
        res.status(404).send(error.message);
    };
};

export const getEventById = async (req, res) => {
    try {
        const getEvent = await EventModel.findById(req.params.id);
        res.status(200).send(getEvent);
    } catch (error) {
        res.status(404).send(error.message);
    };
};

export const deleteEventById = async (req, res) => {
    try {
        const deleteEvent = await EventModel.deleteOne({ _id: req.params.id });
        res.status(202).send(deleteEvent);
    } catch (error) {
        res.status(404).send(error.message);
    };
};

export const createEvent = async (req, res) => {
    try {
        const newEvent = await EventModel.create(req.body);
        res.status(201).send(newEvent);
    } catch (error) {
        res.status(401).send(error.message);
    };
};

export const updateEventById = async (req, res) => {
    try {
        const getEvent = await EventModel.findById(req.params.id);
        await EventModel.updateOne({ _id: req.params.id }, req.body);
        res.status(206).send(`event: ${getEvent.eventTitle} successfully updated`);
    } catch (error) {
        res.status(401).send(error.message);
    };
};