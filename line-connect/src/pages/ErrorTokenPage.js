import React, { Component } from 'react';
import styled from 'styled-components'

const Box = styled.div`
    background-color: Red;
`

class Home extends Component {
  render() {
    return (    
      <Box>
          Error Your Account!
      </Box>
    );
  }
}

export default Home;
