import express from 'express'
import { JWTAuthMiddleware } from '../../auth/token.js'
import MessagesModel from '../messages/model.js'
import UsersModel from '../users/model.js'

const router = express.Router()

router.get('/', JWTAuthMiddleware, async (req, res, next) => {
  try {
    const chats = await MessagesModel.find()
    const users = await UsersModel.find()
    res.send({ chats, users })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
