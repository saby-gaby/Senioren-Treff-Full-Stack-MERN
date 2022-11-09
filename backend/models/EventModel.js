import { Schema, model } from "mongoose";
import UserModel from "./UserModel.js";

const eventSchema = new Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
    enum: ["sport", "kurse", "kultur", "reisen", "natur", "spiele"],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: [String],
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date()
  },
  updatedAt: {
    type: Date
  },
  subscribers: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }]
});

eventSchema.pre(["save"], function (next) {
  console.log("mongoose save() oder updateOne() aufgerufen");
  this.updatedAt = new Date();
  next();
});

eventSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  console.debug('updateOne aufgerufen');
  next()
})


const EventModel = model("event", eventSchema);

export default EventModel;
