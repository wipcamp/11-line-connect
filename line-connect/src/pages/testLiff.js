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
  state = {
    accesstoken: ""
  };
  handleClose = () => {
    const token = Liff.getAccessToken();
    Liff.sendMessages(
      [
        {
          "type": "action",
          "action": {
            "type": "cameraRoll",
            "label": "Send photo"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "camera",
            "label": "Open camera"
          }
        }
      ]
    )
    this.setState({
      accesstoken: token
    });
  };
  render() {
    return (
      <Body>
        <p>{this.state.accesstoken}</p>
        <button onClick={this.handleClose} />
      </Body>
    );
  }
}

export default ErrorNotRegister;
