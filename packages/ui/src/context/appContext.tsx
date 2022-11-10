import React, { createContext, useContext, useEffect, useState } from "react";
import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { ChatClient, createChatClient } from "../clients/chatClient";

import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
  User,
} from "@chat/types";
import { userClient } from "../clients/userClient";

const createSocket = (token: string) => {
  const opts: Partial<ManagerOptions & SocketOptions> = {
    auth: {
      token,
    },
  };
  return process.env.NODE_ENV === "production"
    ? io(opts)
    : io("http://localhost:8080", opts);
};

export type AppContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: Message[];
  chatClient?: ChatClient;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [chatClient, setChatClient] = useState<ChatClient>();
  const [user, setUser] = useState<User | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  /* Use old token on refresh */
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setModalOpen(true);
      return;
    }

    userClient
      .getUsername(token)
      .then((username) => {
        setUser({
          token,
          username,
        });
      })
      .catch(() => {
        sessionStorage.removeItem("token");
        setModalOpen(true);
      });
  }, []);

  /* Create socket and chatClient when user is set */
  useEffect(() => {
    if (user?.token) {
      sessionStorage.setItem("token", user.token);

      const socket = createSocket(user.token);
      const chatClient = createChatClient(socket);
      setSocket(socket);
      setChatClient(chatClient);
    }
  }, [user?.token]);

  useEffect(() => {
    if (socket) {
      socket.connect();
      socket.on("message", (message) => {
        setMessages((messages) => messages.concat(message));
      });
    }

    return () => {
      socket?.off("message");
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <AppContext.Provider
      value={{ user, setUser, messages, chatClient, modalOpen, setModalOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};
