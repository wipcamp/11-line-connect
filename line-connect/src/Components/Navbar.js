import React, { Component } from "react";
import styled from "styled-components";
import Cookie from "js-cookie";

const Bar = styled.div`
  background-color: #304151;
  position: relative;
  z-index: ${props => props.zindex};
`;
class Navbar extends Component {
  render() {
    return (
      <Bar zindex={this.props.zindex}>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a
              class="nav-link"
              style={{ color: "white", fontSize: "13px", height: "40px" }}
            >
              WIP ID :{Cookie.get("wip_id") || ""}{" "}
            </a>
          </li>
        </ul>
      </Bar>
    );
  }
}

export default Navbar;
