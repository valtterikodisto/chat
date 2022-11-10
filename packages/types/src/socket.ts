import { Message, MessageCreate } from "./message";

export type ServerToClientEvents = {
  message: (message: Message) => void;
};

export type ClientToServerEvents = {
  message: (message: MessageCreate) => void;
};
