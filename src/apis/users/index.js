import express from "express";
import createError from "http-errors";
import userModel from "./model.js";
import { generateAccessToken } from "../../auth/tools.js";
import { JWTAuthMiddleware } from "../../auth/token.js";

const userRouter = express.Router();

// (DELETE) LOGOUT USER // WE THEN NEED TO CLEAR COOKIE ON FRONTEND
userRouter.delete("/logout", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// REGISTERING A NEW USER
userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (err) {
    next(err);
  }
});

// LOGIN AS A USER
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.checkCredentials(email, password);

    if (user) {
      const accessToken = await generateAccessToken({
        _id: user._id,
        role: user.role,
      });
      res.send({ accessToken });
    } else {
      next(createError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

// GET INFORMATION FOR A SPECIFIC USER
userRouter.get("/dashboard", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// (A PUT) MODIFY INFORMATION FOR A SPECIFIC USER
userRouter.put("/dashboard", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const modifiedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    res.send(modifiedUser);
  } catch (error) {
    next(error);
  }
});

//(DELETE) A SPECIFIC USER
userRouter.delete("/dashboard", JWTAuthMiddleware, async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.user._id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// GET ALL USERS // NOT SURE IF THIS IS NEEDED
userRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

//GET A SPECIFIC USER // NOT SURE IF THIS IS NEEDED
userRouter.get("/:userId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// DELETE A SPECIFIC USER // NOT SURE IF THIS IS NEEDED
userRouter.delete("/:userId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.userId);
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default userRouter;
