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
    state = ({
        token: 
    )}
  handleConnect = () => {
    let accesstoken = Liff.getAccessToken();
    this.setState({
        token: accesstoken
    })
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
