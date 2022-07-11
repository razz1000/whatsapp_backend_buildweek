import express from 'express'
import { JWTAuthMiddleware } from '../../auth/token.js'
import ChatsModel from './model.js'

const router = express.Router()

router.get('/', JWTAuthMiddleware, async (req, res, next) => {
  try {
    const chats = await ChatsModel.find()
    res.send(chats)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
