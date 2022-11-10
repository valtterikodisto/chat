import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { userClient } from "../clients/userClient";
import { useAppContext } from "../context/appContext";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 50vw;
  max-width: 300px;
  padding: 30px 30px;

  background-color: white;
  box-shadow: 0px 3px 15px 6px rgba(0, 0, 0, 0.08);
  border-radius: 9px;
`;

const H3 = styled.h3`
  margin: 0;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  padding: 5px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  background-color: #064420;
  cursor: pointer;
  width: 90px;
`;

const ModalContent: React.FunctionComponent = () => {
  const { setUser, setModalOpen } = useAppContext();
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    try {
      const user = await userClient.createUser(username);
      setUser(user);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
    }
  };

  return (
    <ModalWrapper>
      <ModalContainer>
        <H3>Create Username</H3>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <FormGroup>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <SubmitButton type="submit">Create</SubmitButton>
        </Form>
      </ModalContainer>
    </ModalWrapper>
  );
};

export const CreateUserModal: React.FunctionComponent = () => {
  return ReactDOM.createPortal(
    <ModalContent />,
    document.getElementById("modal-root")!
  );
};
