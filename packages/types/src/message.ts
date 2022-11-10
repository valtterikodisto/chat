import { string, object, DecoderType, number } from "decoders";
import { User, Username, usernameDecoder } from "./user";

export const messageCreateDecoder = object({
  text: string,
});
export type MessageCreate = DecoderType<typeof messageCreateDecoder>;

export const messageDecoder = object({
  uuid: string,
  text: string,
  timestamp: number,
  username: usernameDecoder,
});
export type Message = {
  uuid: string;
  text: string;
  timestamp: number;
  username: Username;
};
