import EventModel from "../models/EventModel.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await EventModel.find({});
    res.status(200).send(allEvents);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getEventByLocation = async (req, res) => {
  try {
    const getEvents = await EventModel.find({ location: req.params.location });
    res.status(200).send(getEvents);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getEventById = async (req, res) => {
  try {
    const getEvent = await EventModel.findById(req.params.id).populate("subscribers");
    res.status(200).send(getEvent);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteEventById = async (req, res) => {
  try {
    const deleteEvent = await EventModel.deleteOne({ _id: req.params.id });
    res.status(202).send(deleteEvent);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const createEvent = async (req, res) => {
  try {
    const newEvent = await EventModel.create(req.body);

    const passedToken = req.cookies.jwt
    const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET)
    
    await UserModel.findOneAndUpdate({ _id: decodedToken.userId }, { myEvents: newEvent._id })
    
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Event auf die Merkliste setzen 

// export const watchEvent = async (req, res) => {
//   try {
//     const passedToken = req.cookies.jwt
//     const decodedToken = jwt.verify(passedToken, process.env.TOKEN_SECRET)
    
//     await UserModel.findOneAndUpdate({ _id: decodedToken.userId }, { watchedEvents: req.params.id })
//   } catch (error) {
//     res.status(401).send(error.message);
//   }
// }

export const updateEventById = async (req, res) => {
  try {
    const getEvent = await EventModel.findById(req.params.id);
    await EventModel.updateOne({ _id: req.params.id }, req.body);
    res.status(206).send(`event: ${getEvent.eventTitle} successfully updated`);
  } catch (error) {
    res.status(401).send(error.message);
  }
};
