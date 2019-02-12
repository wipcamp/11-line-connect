import React, { Component } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import Cookies from "js-cookie";
import styled from "styled-components";
import Loading from "./../Components/loading";

const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;
const Background = styled.img`
  position: fixed;
  z-index: 0;
  bottom: 0;
  width: 100vw;
`;
const ButtonFacebook = styled.button`
  background-color: #4267b2;
  border-radius: 100px;
  font-size: 18px;
  color: white;
  border: none;
`;
const Logo = styled.img`
  width: 100vw;
`;
let line;
class Home extends Component {
  state = {
    param: "",
    data: {},
    loading: "block"
  };

  componentDidMount = async () => {
    if (!Cookies.get("codeLine")) {
      const url = await new URLSearchParams(window.location.search);
      await Cookies.set("codeLine", url.get("code"));
    }
    const responseLine = await axios({
      method: "post",
      url: `${window.env.PATH_BE}/auth`,
      data: {
        code: Cookies.get("codeLine")
      }
    });
    line = responseLine.data;
    const sendLine = {
      provider_id: line.userId,
      provider_name: "line",
      accessToken: line.accessToken
    };
    let JWT = await axios.post(`${window.env.PATH_AUTH}/auth/login`, sendLine);
    if (JWT.data.token) {
      console.log("auth in", JWT);
      Cookies.remove("codeLine");
      Cookies.set("JWT", JWT.data.token);
      Cookies.set("wip_id", JWT.data.wip_id);
      window.location.href = `${window.env.PATH_FE}/status/connected`;
    }
    setTimeout(() => {
      this.setState({
        loading: "none"
      });
      console.log("loadout");
    }, 5000);
  };

  responseFacebook = async res => {
    const facebook = res;
    Cookies.remove("codeLine");
    console.log("auth in line", line);
    console.log("auth in face", res);
    if(!line){
      window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1638650000&redirect_uri=${
        window.env.PATH_FE
      }&state=asdasd&scope=openid%20profile`;
    }
    try {
      await axios({
        method: "post",
        url: `${window.env.PATH_AUTH}/auth/connect`,
        data: {
          provider_fb: facebook.userID,
          accessTokenFB: facebook.accessToken,
          provider_line: line.userId,
          accessTokenLine: line.accessToken
        }
      }).then(async res => {
        const sendLine = {
          provider_id: line.userId,
          provider_name: "line",
          accessToken: line.accessToken
        };

        if (await res.data.status) {
          let JWT = await axios.post(
            `${window.env.PATH_AUTH}/auth/login`,
            sendLine
          );
          Cookies.set("JWT", JWT.data.token);
          Cookies.set("wip_id", JWT.data.wip_id);
          window.location.href = `${window.env.PATH_FE}/status/success`;
        } else if (
          (await res.data.error) ===
          "Please Register By Facebook Account Before Connect With Line"
        ) {
          window.location.href = `${
            window.env.PATH_FE
          }/status/errornotregister`;
        } else {
          window.location.href = `${window.env.PATH_FE}/status/errortoken`;
        }
      });
    } catch (error) {
      window.location.href = `${window.env.PATH_FE}/status/error`;
    }
  };

  render() {
    return (
      <div className="App">
        <Body>
          <Loading loadingout={this.state.loading} />
          <div
            className="text-center"
            style={{
              position: "absolute",
              zIndex: "2",
              top: "50px",
              width: "100vw"
            }}
          >
            <Logo src="/images/logo.png" />
          </div>
          <div
            className="text-center"
            style={{
              position: "absolute",
              zIndex: "3",
              bottom: "100px",
              width: "100vw"
            }}
          >
            <FacebookLogin
              redirectUri="https://line-connect.freezer.in.th/"
              appId="293604811359850"
              callback={this.responseFacebook}
              render={renderProps => (
                <ButtonFacebook onClick={renderProps.onClick} className=" p-3">
                  <FaFacebookF /> เข้าสู่ระบบด้วย Facebook
                </ButtonFacebook>
              )}
            />
          </div>
          <Background src="/images/BG_Facebook.png" />
        </Body>
      </div>
    );
  }
}

export default Home;
