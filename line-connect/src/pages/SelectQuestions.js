import React, { Component } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import Loading from "../Components/loading";
import SweetAlert from "sweetalert";
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
const Body = styled.body`
  min-height: ${props => props.bodyHeight};
  background-image: url("/images/BG_Q&A.png"), linear-gradient(#ffffff, #f8e9d6);
  background-size: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
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
    userid: "",
    show: "",
    height: ""
  };
  handleQuestion(props) {
    window.location.href = `/question?item=${props}`;
  }
  handlePop = () => {
    SweetAlert("ขออภัย", "ระบบส่วนนี้ยังไม่พร้อมใช้งาน", "error");
  };
  componentDidMount = async () => {
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
    if (!Cookies.get("JWT")) {
      window.location.href = `${window.env.PATH_FE}/checkjwt`;
    } else {
      this.setState({
        loading: "none"
      });
    }
  };
  render() {
    return (
      <Body
        ref={divElement => (this.divElement = divElement)}
        bodyHeight={this.state.height}
      >
        <Loading zindex={3} loadingout={this.state.loading} />
        <Navbar />
        <div style={{ fontWeight: "bold" }} className="container">
          <div className="container">
            <Topic className="">ข้อมูลส่วนตัว</Topic>
            <div className="container">
              <div className="col-12">
                <Button onClick={this.handlePop} className="btn">
                  กรอกประวัติส่วนตัว
                </Button>
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
        </div>
      </Body>
    );
  }
}

export default ShowQuestions;
