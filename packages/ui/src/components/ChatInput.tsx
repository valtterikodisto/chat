import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0px 50px;
  box-shadow: 0px -5px 14px 0px rgba(0, 0, 0, 0.07);
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 5px;
  border: none;
  border-bottom: 2px solid #e8e8e8dd;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  margin-left: 30px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #064420;
  cursor: pointer;
  width: 90px;

  &:disabled {
    background-color: #b1b1b1;
    cursor: not-allowed;
  }
`;

export const ChatInput: React.FunctionComponent = () => {
  const { chatClient } = useAppContext();
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        chatClient?.sendMessage({ text: message });
        setMessage("");
      }}
    >
      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <SendButton disabled={message.length === 0} type="submit">
        Send
      </SendButton>
    </Form>
  );
};
