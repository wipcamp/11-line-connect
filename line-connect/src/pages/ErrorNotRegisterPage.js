import React, { Component } from 'react';
import styled from 'styled-components'

const Box = styled.div`
    background-color: red;
`

class Error extends Component {
  render() {
    return (
      <Box>
          You Not Register Wipcamp !
      </Box>
    );
  }
}

export default Error;
