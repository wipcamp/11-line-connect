import React, { Component } from 'react';
import styled from 'styled-components'
import Cookie from 'js-cookie'
require('dotenv').config()

const Box = styled.div`
    background-color: yellow;
`

class Error extends Component {
    render() {  
        window.location.href =  Cookie.get('redirecturl')||`${window.env.PATH_FE}/selectquestion`
        return (
            <div>
                <Box>
                    You are Connected
                </Box>
            </div>
        );
    }
}

export default Error;
