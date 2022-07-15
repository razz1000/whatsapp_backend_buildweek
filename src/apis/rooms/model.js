import mongoose from "mongoose";

const { Schema, model } = mongoose;

const modelShema = new Schema(
  {
    room: { type: String, required: true },
    members: [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
    messages: [
      { type: mongoose.Types.ObjectId, ref: "Messages", required: true },
    ],
  },
  { timestamps: true }
);
export default model("Room", modelShema);
