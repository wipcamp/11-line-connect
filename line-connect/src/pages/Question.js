import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'
// const Box = styled.div`
//     background-color: green;
// `

class Question extends Component {
    state = {
        item: 0,
        questions: 'dakfisuiofjsiodgjiozdshg',
        answer: 'dgfsdf'
    }
    componentWillMount = () => {
        // const questions = await axios({
        //     method: 'post',
        //     url: '',
        //     data: {
        //         JWT: Cookie.get('JWT')
        //     }
        // })
        // this.setState({ questions: questions })
        const url = new URLSearchParams(window.location.search)
        this.setState({ item: `${url.get('item')}` })
    }
    render() {
        console.log(this.state.answer.length)
        return (
            <div className='container'>
                <h1 className='text-center'>Question</h1>
                <div className='col-12'>
                    <div className='row'>
                        <p>{this.state.item}. {this.state.questions}</p><br></br>
                        <textarea value={this.state.answer} className='col-12' style={{height:'150px'}}></textarea>
                        <div className='col-12 mt-3'>
                            <div className='row float-right'>
                                <div className='inline-block mr-2'><button type="button" class="btn btn-warning">Warning</button></div>
                                <div className='inline-block'><button type="button" class="btn btn-info">Info</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;
