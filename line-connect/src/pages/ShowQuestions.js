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
const Button = styled.button`
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  width: 100%;
  font-weight: bold;
`;
const Body = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(#ffffff, #f8e9d6);
`;
const Content = styled.div`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
const ImgBackground = styled.img`
  position: relative;
  margin-top: 20px;
  width: 100vw;
  @media (max-width: 567px) {
    position: absolute;
    z-index: 0;
    width: 100vw;
    bottom: 0px;
  }
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
      Cookie.set("redirecturl", `${window.env.PATH_FE}/selectquestion`);
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    this.setState({ questions: questionsformDB.data });
  };
  render() {
    if (!Cookie.get("JWT")) {
      Cookie.set("redirecturl", `${window.env.PATH_FE}/selectquestion`);
      window.location.href = `${window.env.PATH_FE}/login`;
    }
    return (
      <Body>
        <Navbar />
        <Content className="container">
          <div className="container">
            <Topic className="">ข้อมูลส่วนตัว</Topic>
            <div className="container">
              <div className="col-12">
                <Button className="btn">กรอกประวัติส่วนตัว</Button>
              </div>
            </div>
          </div>
          <div className="container">
            <Topic>เลือกคำถาม</Topic>

            <div className="container">
              <div className="col-12">
                <div className="row">
                  {this.state.questions.map((item, index) => (
                    <div className="col-6 col-sm-4 text-center mt-3">
                      <Button
                        className="btn"
                        onClick={() => this.handleQuestion(index + 1)}
                      >
                        คำถามที่{index + 1}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Content>
        <ImgBackground src="/images/MaskGroup.png" />
      </Body>
    );
  }
}

export default ShowQuestions;
