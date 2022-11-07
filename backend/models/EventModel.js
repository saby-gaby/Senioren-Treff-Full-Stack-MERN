import { Schema, model } from "mongoose";

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
});

const EventModel = model("event", eventSchema);

export default EventModel;
