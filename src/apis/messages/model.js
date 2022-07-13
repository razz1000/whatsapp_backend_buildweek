import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messagesSchema = new Schema(
  {
    sender: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    content: {
      text: String,
      media: String,
    },
  },
  { timestamps: true }
);
export default model("Messages", messagesSchema);
