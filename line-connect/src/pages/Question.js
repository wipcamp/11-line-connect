import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookie from "js-cookie";
import Authline from "./../service/AuthLine";

import Navbar from "../Components/Navbar";
require("dotenv").config();

const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;
const ImgBackground = styled.img`
  position: relative;
  margin-top: 20px;
  width: 100vw;
  @media (max-width: 567px) {
    position: fixed;
    bottom: 0;
    margin-top: 0;
  }
`;

class Question extends Component {
  state = {
    questionid: 0,
    question: "กำลังโหลดคำถาม",
    answer: "กำลังโหลดคำตอบ",
    statusAns: "disabled",
    statusEdit: "",
    ans: ""
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
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    if (questionsformDB.data.answer[0]) {
      this.setState({
        question: questionsformDB.data.question.content,
        answer: questionsformDB.data.answer[0].ans_content
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
  handleAnswerByButton = () => {
    this.setState({
      statusAns: ""
    });
  };
  handleAnswer = e => {
    this.setState({
      answer: e.target.value
    });
  };
  handleSendAnswer = async () => {
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
  };

  render() {
    if (!Cookie.get("JWT")) {
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    return (
      <Body>
        <Navbar />
        <div className="container">
          <h1 className="text-center">Question</h1>
          <div className="col-12">
            <div className="row">
              <p>
                {this.state.questionid}. {this.state.question}
              </p>
              <br />
              <textarea
                value={this.state.answer}
                disabled={this.state.statusAns}
                onChange={this.handleAnswer}
                className="col-12"
                style={{ height: "150px" }}
              />
              <div className="col-12 mt-3">
                <div className="row float-right">
                  {/* <div className="row float-"> */}
                  {/* <div className="inline-block mr-2"> */}
                  <button
                    type="button"
                    class="btn btn-warning mr-2"
                    onClick={this.handleAnswerByButton}
                    disabled={this.state.statusEdit}
                  >
                    แก้ไข
                  </button>
                  {/* </div> */}
                  {/* <div className="inline-block"> */}
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={this.handleSendAnswer}
                  >
                    ยืนยัน
                  </button>
                  {/* </div> */}
                  {/* </div> */}
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
