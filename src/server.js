import express from "express";
//Socket IO:
import { createServer } from "http";
import { Server } from "socket.io";
import connectionHandler from "./socket/index.js";
//************** */
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {
  badRequestHandler,
  forbiddenHandler,
  genericErrorHandler,
  notFoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";
import userRouter from "./apis/users/index.js";
import roomsRouter from "./apis/rooms/index.js";

const server = express();
const port = process.env.PORT || 3001;

const httpServer = createServer(server);

// ****************************************************** MIDDLEWARES **********************************************

server.use(cors());
server.use(express.json());
/* server.use(passport.initialize()); */

// ******************************************************* ENDPOINTS ***********************************************

server.use("/users", userRouter);
server.use("/rooms", roomsRouter);

// ***************************************************** ERROR HANDLERS ********************************************

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(genericErrorHandler);

const io = new Server(httpServer);
io.on("connection", connectionHandler);

mongoose.connect(process.env.MONGO_CONNECTION_URL);

/* mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
}); */

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server running on port ${port}`);
  });
});
