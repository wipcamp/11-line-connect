import React, { Component } from 'react';
import styled from 'styled-components'
import Cookie from 'js-cookie'
require('dotenv').config()

const Box = styled.div`
    background-color: yellow;
`

class Error extends Component {
    render() {
        return (
            <div>
                <Box>
                    {Cookie.get('JWT')}
                    You are Connected
                </Box>
            </div>
        );
    }
}

export default Error;
