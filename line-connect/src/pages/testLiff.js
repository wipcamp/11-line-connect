import React, { Component } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
require("dotenv").config();

const Liff = window.liff;

const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;

class ErrorNotRegister extends Component {
  handleClose = () => {
    Liff.closeWindow();
  };
  render() {
    return (
      <Body>
        <p>{Cookies.get("JWT")}</p>
        <p>{Liff.getAccessToken()}</p>
      </Body>
    );
  }
}

export default ErrorNotRegister;
