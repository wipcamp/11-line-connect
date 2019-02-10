import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";

import Navbar from "../Components/Navbar";
require("dotenv").config();

const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;
const ImgBackground = styled.img`
  position: relative;
  margin-top: 50px;
  width: 100vw;
`;
const ButtonBack = styled.button`
  border: 1px solid #304151;
  background: transparent;
  color: #304151;
`;
const ButtonAnswer = styled.button`
  border: 1px solid #304151;
  background: #304151;
  color: #fff;
`;

class Question extends Component {
  state = {
    questionid: 0,
    question: "กำลังโหลดคำถาม",
    answer: "กำลังโหลดคำตอบ",
    statusAns: "disabled",
    statusEdit: "",
    button: "บันทึก"
  };
  componentDidMount = async () => {
    const url = new URLSearchParams(window.location.search);
    this.setState({ questionid: `${url.get("item")}` });
    const questionsformDB = await axios({
      method: "post",
      url: `${window.env.PATH_BE}/question`,
      data: {
        JWT: Cookie.get("JWT"),
        questionid: `${url.get("item")}`
      }
    });
    if (questionsformDB.data === "getquestionsProblem") {
      Cookie.set("redirecturl", `${window.env.PATH_FE}/selectquestion`);
      window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1638650000&redirect_uri=${window.env.PATH_FE}&state=asdasd&scope=openid%20profile`
      }
    if (questionsformDB.data.answer[0]) {
      this.setState({
        question: questionsformDB.data.question.content,
        answer: questionsformDB.data.answer[0].ans_content,
        button: "แก้ไข"
      });
    } else {
      this.setState({
        question: questionsformDB.data.question.content,
        answer: "",
        statusAns: "",
        statusEdit: "disabled"
      });
    }
  };
  handleAnswer = e => {
    this.setState({
      answer: e.target.value,
      statusEdit: ""
    });
  };
  handleSendAnswer = async () => {
    if (this.state.button === "บันทึก") {
      try {
        await axios({
          method: "post",
          url: `${window.env.PATH_BE}/sendAnswer`,
          data: {
            JWT: Cookie.get("JWT"),
            questionid: this.state.questionid,
            content: this.state.answer
          }
        }).then(() => {
          window.location.href = `${window.env.PATH_FE}/selectquestion`;
        });
      } catch (error) {
        if (error.data === "getquestionsProblem") {
          window.location.href = `${window.env.PATH_FE}/ErrorTokenPage`;
        }
      }
    } else {
      this.setState({
        statusAns: "",
        button: "บันทึก"
      });
    }
  };
  handleBack = () => {
    window.location.href = `${window.env.PATH_FE}/selectquestion`;
  };

  render() {
    if (!Cookie.get("JWT")) {
      Cookie.set("redirecturl", `${window.env.PATH_FE}/selectquestion`);
      window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1638650000&redirect_uri=${window.env.PATH_FE}&state=asdasd&scope=openid%20profile`
    }
    return (
      <Body>
        <Navbar />
        <div style={{ fontWeight: "bold" }}>
          <div className="container mt-4">
            <div className="container">
              <div className="col-12">
                <div className="row">
                  <p>
                    คำถามที่ {this.state.questionid} : {this.state.question}
                  </p>
                  <br />
                  <textarea
                    value={this.state.answer}
                    onChange={this.handleAnswer}
                    disabled={this.state.statusAns}
                    className="col-12 mt-3"
                    style={{
                      height: "150px",
                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)"
                    }}
                  />
                  <div className="col-12 mt-4">
                    <div className="row">
                      <div className="col pl-0">
                        <ButtonBack
                          type="button"
                          className="btn"
                          onClick={this.handleBack}
                        >
                          ย้อนกลับ
                        </ButtonBack>
                      </div>
                      <div className="col text-right pr-0">
                        <ButtonAnswer
                          type="button"
                          className="btn"
                          onClick={this.handleSendAnswer}
                          disabled={this.state.statusEdit}
                        >
                          {this.state.button}
                        </ButtonAnswer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ImgBackground src="/images/MaskGroup.png" />
      </Body>
    );
  }
}

export default Question;
