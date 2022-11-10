import { userDecoder, usernameDecoder } from "@chat/types";
import axios from "axios";
import { object } from "decoders";

const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

export const userClient = {
  createUser: async (username: string) => {
    console.log(process.env.NODE_ENV);
    const { data } = await axios.post(`${baseUrl}/users/new`, { username });
    const user = userDecoder.verify(data);
    sessionStorage.setItem("token", user.token);
    return user;
  },
  getUsername: async (token: string) => {
    const { data } = await axios.post(`${baseUrl}/users/me`, { token });
    const { username } = object({ username: usernameDecoder }).verify(data);
    return username;
  },
};
