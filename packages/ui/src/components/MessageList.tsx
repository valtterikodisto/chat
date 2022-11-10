import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { Message } from "./Message";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 20px;
  height: 80vh;
  overflow-y: scroll;
`;

export const MessageList: React.FunctionComponent = () => {
  const { user, messages } = useAppContext();
  const messageListEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageListEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <Container>
      <MessageListWrapper>
        <div
          style={{
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          {messages.map((message) => {
            return (
              <Message
                key={message.uuid}
                message={message}
                side={message.username === user?.username ? "right" : "left"}
              />
            );
          })}
          <div ref={messageListEndRef} />
        </div>
      </MessageListWrapper>
    </Container>
  );
};
