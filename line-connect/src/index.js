import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

const Body = styled.div`
  font-family: "Sarabun", sans-serif;
`;

const AppWithRoute = () => (
  <BrowserRouter>
    <Body>
      <App />
    </Body>
  </BrowserRouter>
);

ReactDOM.render(<AppWithRoute />, document.getElementById("root"));
