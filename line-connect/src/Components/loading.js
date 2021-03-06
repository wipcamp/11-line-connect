import React, { Component } from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: papayawhip;
  display: ${props => props.loadingout};
  position: absolute;
  z-index: ${props => props.zindex};
`;

const Position = styled.img`
  margin-top: 35vh;
  width: 15%;
  position: absolute;
  @media (max-width: 720px) {
    width: 40%;
  }
`;

export default class Loading extends Component {
  render() {
    return (
      <Background zindex={this.props.zindex} loadingout={this.props.loadingout}>
        <div className="container">
          <div className="row text-center justify-content-center">
            <Position src="/images/loading.gif" />
            Connecting...
          </div>
        </div>
      </Background>
    );
  }
}
