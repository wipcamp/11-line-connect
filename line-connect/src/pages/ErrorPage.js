import React, { Component } from "react";
import styled from "styled-components";
import { FaTimesCircle } from "react-icons/fa";
import Cookies from "js-cookie";
require("dotenv").config();

const Liff = window.liff;

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

class ErrorNotRegister extends Component {
  componentDidMount = () => {
    document.title = "Error";
  };
  handleItim = () => {
    window.location.href = `${window.env.PATH_ITIM}`;
  };
  handleClose = () => {
    Liff.closeWindow();
  };
  render() {
    return (
      <Body>
        <title>Error</title>
        <div className="container p-5">
          <Box className="mt-5 p-5 text-center">
            <p>
              <FaTimesCircle className="mr-2" style={{ color: "#F5222D" }} />
              ไม่สามารถเข้าสู่ระบบได้กรุณาลองใหม่อีกครั้งนะขอรับ
            </p>
            <ButtonAnswer
              onClick={this.handleClose}
              type="button"
              className="btn pl-3 pr-3 mt-5"
            >
              ปิด
            </ButtonAnswer>
          </Box>
        </div>
        <Background src="/images/BG_Error.png" />
      </Body>
    );
  }
}

export default ErrorNotRegister;
