import React, { Component } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const Liff = window.liff;
// const Bar = styled.div`
//   background-color: #304151;
//   position: relative;
//   z-index: ${props => props.zindex};
// `;
class ConnectPage extends Component {
  state = {
    token: "",
    userid: ""
  };
  handleConnect = () => {
    let accesstoken = Liff.getAccessToken();
    let userid = Liff.getProfile().userId;
    this.setState({
      token: accesstoken,
      userid: userid
    });
  };
  render() {
    return (
      <div>
        {Cookies.get("act")}
        <button onClick={this.handleConnect}>Click</button>
      </div>
    );
  }
}

export default ConnectPage;
