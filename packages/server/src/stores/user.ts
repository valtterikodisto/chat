import { User, Username } from "@chat/types";
import crypto from "crypto";

class UserStore {
  private usernames: Record<User["username"], boolean | undefined> = {};
  private users: Record<User["token"], User | undefined> = {};

  public createUser(username: Username): User {
    if (this.usernames[username]) {
      throw new Error("Username already exists");
    }

    const user: User = {
      token: crypto.randomBytes(48).toString("hex"),
      username,
    };
    this.users[user.token] = user;
    this.usernames[user.username] = true;

    return user;
  }

  public getUsernameByToken(token: User["token"]): Username | undefined {
    return this.users[token]?.username;
  }
}

export const userStore = new UserStore();
