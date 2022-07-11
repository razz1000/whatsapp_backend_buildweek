import mongoose from 'mongoose'
import User from '../users/model.js'
import Message from '../messages/model.js'

const { Schema, model } = mongoose

const chatShema = new Schema({
  members: [{ type: mongoose.ObjectId, required: true, ref: User }],
  messages: [{ type: mongoose.ObjectId, required: true, ref: Message }]
})
export default model('Chat', chatShema)
