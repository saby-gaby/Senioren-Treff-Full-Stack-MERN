import { Schema, model } from "mongoose";
import EventModel from "./EventModel.js";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["female", "male", "diverse", "none"],
    required: true,
  },
  disabilities: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
  },
  myEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: EventModel,
    },
  ],
  watchedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  ],
  bookedEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  ],
});

userSchema.pre(["save"], function (next) {
  console.log("mongoose save() oder updateOne() aufgerufen");
  this.updatedAt = new Date();
  next();
});

userSchema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  console.debug("mongoose findOneAndUpdate oder updateOne aufgerufen");
  this.set({ updatedAt: new Date() });
  next();
});

const UserModel = model("user", userSchema);

export default UserModel;
