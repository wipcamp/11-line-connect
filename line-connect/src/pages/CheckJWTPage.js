import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import { FaJournalWhills } from "react-icons/fa";

const Liff = window.liff;

class ConnectPage extends Component {
  state = {
    token: "",
    userId: "",
    tokens: "",
    wipid: ""
  };
  handleConnect = async () => {
    const accesstoken = await Liff.getAccessToken();
    const profile = await Liff.getProfile();

    const line = {
      provider_id: profile.userId,
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
        Cookies.set("userId", profile.userId);
        window.location.href = `${window.env.PATH_FE}/`;
      }
    });
  };
  render() {
    return (
      <div>
        <p>jwt : {this.state.tokens}</p>
        <p>wip id : {this.state.wipid}</p>
        <p>token : {this.state.token}</p>
        <p>user id : {this.state.userId}</p>
        <button onClick={this.handleConnect}>Click</button>
      </div>
    );
  }
}

export default ConnectPage;
