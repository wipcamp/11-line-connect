import React, { Component } from 'react';
import styled from 'styled-components'

const Box = styled.div`
    background-color: yellow;
`

class Error extends Component {
    Close = () => {
        window.close();
    }
    componentDidMount() {
        setTimeout(function () {
            window.this.Close();
        }, 5000)
    }
    render() {
        return (
            <div>
                <Box>
                    You are Connected
                </Box>
                <button onClick={() => window.close()}>Click</button>
            </div>
        );
    }
}

export default Error;