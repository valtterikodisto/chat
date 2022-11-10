import React from "react";
import styled from "styled-components";
import { Message as MessageType } from "@chat/types";

type Side = "left" | "right";

const Container = styled.div<{ side: Side }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.side === "left" ? "flex-start" : "flex-end"};
  justify-content: flex-start;
  margin: 10px 0;
  width: 100%;
`;

const MetaInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sender = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Time = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const Box = styled.div<{ side: Side }>`
  padding: 10px 20px;
  color: ${(props) => (props.side === "left" ? "black" : "white")};
  border-radius: ${(props) =>
    props.side === "left" ? "10px 10px 10px 0" : "10px 10px 0px 10px"};
  background-color: ${(props) =>
    props.side === "left" ? "#b1b1b1" : "#064420"};
  overflow-wrap: anywhere;
`;

export type MessageProps = {
  message: MessageType;
  side: Side;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const Message: React.FunctionComponent<MessageProps> = ({
  message,
  side,
}) => {
  return (
    <Container side={side}>
      <MetaInfoContainer>
        <Sender>{message.username}</Sender>
        <Time>{formatTimestamp(message.timestamp)}</Time>
      </MetaInfoContainer>
      <Box side={side}>{message.text}</Box>
    </Container>
  );
};
