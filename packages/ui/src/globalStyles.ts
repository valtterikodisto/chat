import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  #root {
    overflow: hidden;
  }
  
  #modal-root {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  ::-webkit-scrollbar {
    display: none;
}
`;

export default GlobalStyle;
