import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatShema = new Schema(
  {
    members: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
    messages: [
      { type: mongoose.Types.ObjectId, ref: "Messages", required: true },
    ],
  },
  { timestamps: true }
);
export default model("Chat", chatShema);
