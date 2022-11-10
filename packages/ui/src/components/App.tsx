import { MessageList } from "./MessageList";
import { CreateUserModal } from "./CreateUserModal";
import { useAppContext } from "../context/appContext";
import { ChatInput } from "./ChatInput";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 700px;
  background-color: white;
  border: 2px solid #eaeaea;
`;

export const App = () => {
  const { modalOpen } = useAppContext();

  return (
    <Wrapper>
      <Container>
        {modalOpen && <CreateUserModal />}
        <MessageList />
        <ChatInput />
      </Container>
    </Wrapper>
  );
};

export default App;
