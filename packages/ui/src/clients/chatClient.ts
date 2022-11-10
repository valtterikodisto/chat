import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  MessageCreate,
  ServerToClientEvents,
} from "@chat/types";

export type ChatClient = typeof createChatClient extends (
  socket: Socket
) => infer R
  ? R
  : never;

export const createChatClient = (
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
) => ({
  sendMessage: (message: MessageCreate) => {
    socket.emit("message", message);
  },
});
