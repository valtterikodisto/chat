import express from "express";
import { usernameDecoder, tokenDecoder } from "../../../types";
import { NotFoundError } from "../middlewares/error";
import { userStore } from "../stores/user";

export const userRouter = express.Router();

userRouter.post("/new", (req, res, next) => {
  const username = usernameDecoder.verify(req.body.username);
  const user = userStore.createUser(username);
  res.send(user);
});

userRouter.post("/me", (req, res) => {
  const token = tokenDecoder.verify(req.body.token);
  const username = userStore.getUsernameByToken(token);
  if (!username) {
    throw new NotFoundError("User not found");
  }
  res.send({ username });
});
