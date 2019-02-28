import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";

import Navbar from "../Components/Navbar";
require("dotenv").config();

const Body = styled.body`
  min-height: ${props => props.bodyHeight};
  background-image: url("/images/BG_Q&A.png"), linear-gradient(#ffffff, #f8e9d6);
  background-size: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
`;
const ButtonBack = styled.button`
  border: 1px solid #304151;
  background: transparent;
  color: #304151;
  @media only screen and (max-height: 600px) {
    margin-bottom: 150px;
  }
`;
const ButtonAnswer = styled.button`
  border: 1px solid #304151;
  background: #304151;
  color: #fff;
`;
const Label = styled.p`
  margin-bottom: 0;
  margin-left: 15px;
`;
const LabelWarning = styled.p`
  color: #304151;
  margin-bottom: 0;
  margin-left: 15px;
`;
const ImgBackground = styled.img`
  width: 100vw;
`;
const ButtonMale = styled.button`
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  &::before {
    background-color: red;
  }
`;
const ButtonFemale = styled.button`
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
`;
class EditProfile extends Component {
  state = {
    height: ""
  };
  componentDidMount = async () => {
    const heightDiv = this.divElement.clientHeight + 100;
    const heightWeb = window.innerHeight;
    const height = heightDiv + 100;
    if (heightWeb > heightDiv) {
      await this.setState({
        height: window.innerHeight + "px"
      });
    } else {
      await this.setState({
        height: height + "px"
      });
    }
    // const url = new URLSearchParams(window.location.search);
    // this.setState({ questionid: `${url.get("item")}` });
    // if (!Cookie.get("JWT")) {
    //   Cookie.set(
    //     "redirecturl",
    //     `${window.env.PATH_FE}/question?item=${url.get("item")}`
    //   );
    //   window.location.href = `${window.env.PATH_FE}/checkjwt`;
    // }
    // const questionsformDB = await axios({
    //   method: "post",
    //   url: `${window.env.PATH_BE}/question`,
    //   data: {
    //     JWT: Cookie.get("JWT"),
    //     questionid: `${url.get("item")}`
    //   }
    // });
    // if (questionsformDB.data === "getquestionsProblem") {
    //   Cookie.set(
    //     "redirecturl",
    //     `${window.env.PATH_FE}/question?item=${url.get("item")}`
    //   );
    //   window.location.href = `${window.env.PATH_FE}/checkjwt`;
    // }
    // if (questionsformDB.data.answer[0]) {
    //   this.setState({
    //     question: questionsformDB.data.question.content,
    //     answer: questionsformDB.data.answer[0].ans_content,
    //     button: "แก้ไข"
    //   });
    // } else {
    //   this.setState({
    //     question: questionsformDB.data.question.content,
    //     answer: "",
    //     statusAns: "",
    //     statusEdit: "disabled"
    //   });
    // }
  };
  handleAlert = () => {
    window.alert("sfajksdh");
  };
  handleBack = () => {
    window.location.href = `${window.env.PATH_FE}/selectquestion`;
  };
  render() {
    return (
      <Body
        ref={divElement => (this.divElement = divElement)}
        bodyHeight={this.state.height}
      >
        <Navbar />
        <div className="container p-4">
          <form onSubmit={this.handleAlert}>
            <p className="font-weight-bold" style={{ fontSize: "18px" }}>
              ข้อมูลทางการศึกษา
            </p>
            <div className="mb-3">
              <Label>ชื่อโรงเรียน :</Label>
              <input type="text" class="form-control" required />
            </div>
            <div className="mb-3">
              <Label>ระดับชั้น :</Label>
              <input type="text" class="form-control" required />
            </div>
            <div className="mb-3">
              <Label>สายการเรียน :</Label>
              <input type="text" class="form-control" required />
            </div>
            <div className="mb-3">
              <Label>เกรดเฉลี่ยนสะสม :</Label>
              <input type="text" class="form-control" required />
            </div>
            <button type="submit">ถัดไป</button>
          </form>
        </div>
      </Body>
    );
  }
}

export default EditProfile;
