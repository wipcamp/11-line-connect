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
     Liff.sendMessages([{
      "type": "template",
      "altText": "this is a confirm template",
      "template": {
          "type": "confirm",
          "text": "Are you sure?",
          "actions": [
              {
                "type": "message",
                "label": "Yes",
                "text": "yes"
              },
              {
                "type": "message",
                "label": "No",
                "text": "no"
              }
          ]
      }
    }])
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
