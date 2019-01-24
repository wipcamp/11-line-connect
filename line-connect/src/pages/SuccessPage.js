import React, { Component } from 'react';
import styled from 'styled-components'
require('dotenv').config()

const Box = styled.div`
    background-color: green;
`

class Home extends Component {

  render() {
    return (
      <Box>
        
          Success!
      </Box>
    );
  }
}

export default Home;
