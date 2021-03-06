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

class Question extends Component {
  state = {
    questionid: 0,
    question: "กำลังโหลดคำถาม",
    answer: "กำลังโหลดคำตอบ",
    statusAns: "disabled",
    statusEdit: "",
    button: "บันทึก",
    height: ""
  };
  componentDidMount = async () => {
    document.title = "Questions";
    const heightDiv = this.divElement.clientHeight + 100;
    const heightWeb = window.innerHeight;
    const height = heightDiv + 50;
    if (heightWeb > heightDiv) {
      await this.setState({
        height: window.innerHeight + "px"
      });
    } else {
      await this.setState({
        height: height + "px"
      });
    }
    const url = new URLSearchParams(window.location.search);
    this.setState({ questionid: `${url.get("item")}` });
    if (!Cookie.get("JWT")) {
      Cookie.set("redirecturl", `question?item=${url.get("item")}`);
      window.location.href = `${window.env.PATH_FE}/checkjwt`;
    }
    const questionsformDB = await axios({
      method: "post",
      url: `${window.env.PATH_BE}/question`,
      data: {
        JWT: Cookie.get("JWT"),
        questionid: `${url.get("item")}`
      }
    });
    if (questionsformDB.data === "getquestionsProblem") {
      Cookie.set("redirecturl", `question?item=${url.get("item")}`);
      window.location.href = `${window.env.PATH_FE}/checkjwt`;
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
    return (
      <Body
        ref={divElement => (this.divElement = divElement)}
        bodyHeight={this.state.height}
      >
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
      </Body>
    );
  }
}

export default Question;
