import React, { Component } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import AuthLine from "./../service/AuthLine"
require("dotenv").config();

const Liff = window.liff;

const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;

class ErrorNotRegister extends Component {
  state = {
    profile: ""
  };
  handleClose = async() => {
    const token = Liff.getAccessToken();
  const profileTemp= await AuthLine.login(token)
    this.setState({
      profile: profileTemp
    });
  };
  render() {
    return (
      <Body>
        <p>{Cookies.get("accessToken")}</p>
        <p>{this.state.profile}</p>
        <button onClick={this.handleClose} />
      </Body>
    );
  }
}

export default ErrorNotRegister;
