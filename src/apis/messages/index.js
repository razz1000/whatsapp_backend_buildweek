import express from "express";
import { JWTAuthMiddleware } from "../../auth/token.js";
import MessagesModel from "./model.js";
import UsersModel from "../users/model.js";

const router = express.Router();

router.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const messages = await MessagesModel.find({ sender: req.user._id });
    res.send(messages);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.post("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const newMessage = new MessagesModel({ sender: req.user._id, ...req.body });
    res.send(newMessage);
    const newMessage = new MessagesModel({ sender: req.user._id, ...req.body })
    const { _id } = await newMessage.save()
    res.send({ _id })

  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
