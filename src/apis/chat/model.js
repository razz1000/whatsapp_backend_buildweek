import mongoose from "mongoose";
import User from "../users/model.js";
import Messages from "../messages/model.js";

const { Schema, model } = mongoose;

const chatShema = new Schema(
  {
    members: { type: mongoose.ObjectId, ref: User, required: true },
    messages: { type: mongoose.ObjectId, ref: Messages, required: true },
  },
  { timestamps: true }
);
export default model("Chat", chatShema);
