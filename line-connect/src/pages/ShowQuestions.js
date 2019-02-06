import React, { Component } from "react";
import styled from "styled-components";
import Authline from "./../service/AuthLine";
import axios from "axios";
import Cookie from "js-cookie";
import Navbar from "../Components/Navbar";

require("dotenv").config();

const Topic = styled.p`
  font-size: 24px;
  margin-top: 25px;
`;
const Button = styled.div`
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  text-align: center;
  border-radius: 5px;
  border: solid 1px gray;
  background-color: white;
`;
const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;

class ShowQuestions extends Component {
  state = {
    questions: []
  };
  handleQuestion(props) {
    window.location.href = `/question?item=${props}`;
  }
  componentDidMount = async () => {
    const questionsformDB = await axios({
      method: "post",
      url: `${window.env.PATH_BE}/questions`,
      data: {
        JWT: Cookie.get("JWT")
      }
    });
    if (questionsformDB.data === "getquestionsProblem") {
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    this.setState({ questions: questionsformDB.data });
  };
  render() {
    if (!Cookie.get("JWT")) {
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    return (
      <Body>
        <Navbar />
        <div className="container">
          <div className="container">
            <Topic className="">ข้อมูลส่วนตัว</Topic>
            <div className="container">
              <div className="col-12">
                <Button>กรอกประวัติส่วนตัว</Button>
              </div>
            </div>
          </div>
          {/* <h2>{Cookie.get("JWT")}</h2> */}
          <div className="container">
            <Topic>เลือกคำถาม</Topic>
          </div>
          <div className="col-12">
            <div className="row">
              {this.state.questions.map((item, index) => (
                <div className="col-6 col-sm-4 text-center mt-3">
                  <Button onClick={() => this.handleQuestion(index + 1)}>
                    คำถามที่{index + 1}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Body>
    );
  }
}

export default ShowQuestions;
