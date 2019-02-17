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
    this.setState({
      accesstoken: token
    });
    Liff.getProfile().then(function (profile) {
      Liff.sendMessages([
      {
        type: 'image',
        originalContentUrl: '',
        previewImageUrl: ''
      },
      {
        type: 'text',
        text: 'From:' + profile.displayName
      }
      ]).then(function () {
        Liff.closeWindow();
      }).catch(function (error) {
      window.alert('Error sending message: ' + error.message);
      });
    }).catch(function (error) {
      window.alert("Error getting profile: " + error.message);
    });
  }


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
