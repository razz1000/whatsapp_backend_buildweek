import mongoose from 'mongoose'
import User from '../users/model.js'

const { Schema, model } = mongoose

const messagesSchema = new Schema(
  {
    sender: { type: mongoose.ObjectId, required: true, ref: User },
    content: {
      text: String,
      media: String
    }
  },
  { timestamps: true }
)
export default model('Messages', messagesSchema)
