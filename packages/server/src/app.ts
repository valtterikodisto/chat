import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

import { ClientToServerEvents, ServerToClientEvents } from "@chat/types";
import { initChatSocket } from "./routers/chat";
import { userRouter } from "./routers/user";
import {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
} from "./middlewares/error";

export const app = express();
export const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
  },
});
initChatSocket(io);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});

app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);
