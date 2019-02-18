import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";

const Liff = window.liff;

class ConnectPage extends Component {
  state = {
    token: "",
    userid: ""
  };
  handleConnect = async () => {
    const accesstoken = await Liff.getAccessToken();
    const userid = await Liff.getProfile().userId;
    const line = {
      provider_id: userid,
      provider_name: "line",
      accessToken: accesstoken
    };
    await axios.post(`${window.env.PATH_AUTH}/auth/login`, line).then(JWT => {
      if (JWT.data.wip_id) {
        Cookies.set("JWT", JWT.data.token);
        Cookies.set("wip_id", JWT.data.wip_id);
        window.location.href = `${window.env.PATH_FE}/selectquestion`;
      } else {
        Cookies.set("accessToken", accesstoken);
        Cookies.set("userId", userid);
        window.location.href = `${window.env.PATH_FE}/`;
      }
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.handleConnect}>Click</button>
      </div>
    );
  }
}

export default ConnectPage;
