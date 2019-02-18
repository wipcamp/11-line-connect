import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import { FaLine } from "react-icons/fa";

const Liff = window.liff;

const Body = styled.body`
  height: 100vh;
  background-image: url("/images/BG_Facebook.png"),
    linear-gradient(#ffffff, #f8e9d6);
  background-size: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
`;

const Logo = styled.img`
  width: 100vw;
`;

const Button = styled.button`
  background-color: #09b900;
  border-radius: 100px;
  font-size: 18px;
  color: white;
  border: none;
`;

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
        <Body>
          <Logo src="/images/logo.png" className="mt-5" />
          <div className="text-center" style={{ marginTop: "80vw" }}>
            <Button className="p-2 pl-3 pr-3" onClick={this.handleConnect}>
              <FaLine className="mr-3" />
              เข้าสู่ระบบด้วย Line
            </Button>
          </div>
        </Body>
      </div>
    );
  }
}

export default ConnectPage;
