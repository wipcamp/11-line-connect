import React, { Component } from 'react';
import styled from 'styled-components'

const Box = styled.div`
    background-color: yellow;
`

const Close = () => {
    window.close();
}
class Error extends Component {
    componentDidMount() {
        setTimeout(function () {
            window.close();
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
