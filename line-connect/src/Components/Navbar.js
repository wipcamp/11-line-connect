import React, { Component } from 'react';
import styled from 'styled-components'

const Bar = styled.div`
    background-color: #304151;
`
class Navbar extends Component {
    render() {
        return (
            <Bar>
                <ul class="nav justify-content-end" style={{height: '40px'}}>
                    <li class="nav-item">
                        <a class="nav-link" style={{color:'white',fontSize:'13px',height: '40px'}}>WIP ID : </a>
                    </li>
                </ul>
            </Bar>
        );
    }
}

export default Navbar;