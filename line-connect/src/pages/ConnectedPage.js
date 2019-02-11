import React, { Component } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import Cookie from "js-cookie";
require("dotenv").config();

const Box = styled.div`
  background-color: white;
  box-shadow: 0px 0px 4px #d9d9d9;
  border-radius: 4px;
  position: relative;
  z-index: 1;
`;
const Background = styled.img`
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 0;
`;
const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;
const ButtonAnswer = styled.button`
  border: 1px solid #304151;
  background: #304151;
  color: #fff;
`;

class Error extends Component {
  render() {
    // window.location.href =  Cookie.get('redirecturl')||`${window.env.PATH_FE}/selectquestion`
    return (
      <Body>
        <div className="container p-5">
          <Box className="mt-5 p-5 text-center">
            <p>
              <FaCheckCircle className="mr-2" style={{ color: "#76B445" }} />
              เข้าสู่ระบบสำเร็จ
            </p>
            <ButtonAnswer type="button" className="btn pl-3 pr-3 mt-5 mx-auto">
              ปิด
            </ButtonAnswer>
          </Box>
        </div>
        <Background src="/images/BG_Connect.png" />
      </Body>
    );
  }
}

export default Error;
