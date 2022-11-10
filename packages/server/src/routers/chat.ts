import { Server } from "socket.io";
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "@chat/types";
import { userStore } from "../stores/user";
import * as uuid from "uuid";

export const initChatSocket = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const username = userStore.getUsernameByToken(token);

    if (!username) {
      return next(new Error("User does not exist"));
    }
    socket.token = token;
    next();
  });

  io.on("connection", (socket) => {
    const username = userStore.getUsernameByToken(socket.token)!;

    socket.on("message", (messageCreate) => {
      const message: Message = {
        uuid: uuid.v4(),
        text: messageCreate.text,
        timestamp: Date.now(),
        username,
      };
      io.emit("message", message);
    });
  });
};
