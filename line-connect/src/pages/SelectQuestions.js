import React, { Component } from "react";
import styled from "styled-components";
import Authline from "../service/AuthLine";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import Loading from "../Components/loading";
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
  position: absolute;
  z-index: 0;
  width: 100vw;
  bottom: 0px;
`;

class ShowQuestions extends Component {
  state = {
    questions: [
      "loading",
      "loading",
      "loading",
      "loading",
      "loading",
      "loading"
    ],
    loading: "block",
    accesstoken: "",
    userid: ""
  };
  handleQuestion(props) {
    window.location.href = `/question?item=${props}`;
  }
  componentDidMount = async () => {
    if (!Cookies.get("JWT")) {
      window.location.href = `${window.env.PATH_BE}/connect`;
    } else {
      this.setState({
        loading: "none"
      });
    }
  };
  render() {
    return (
      <Body>
        <Loading zindex={3} loadingout={this.state.loading} />
        <Navbar zindex={2} />
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
                  <p>{this.state.accesstoken}</p>
                  <p>{this.state.userid}</p>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <ImgBackground src="/images/BG_Q&A.png" />
      </Body>
    );
  }
}

export default ShowQuestions;
