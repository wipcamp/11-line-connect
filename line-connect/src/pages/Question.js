import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'
// const Box = styled.div`
//     background-color: green;
// `

class Question extends Component {
    state = {
        questionid: 0,
        questions: 'dakfisuiofjsiodgjiozdshg',
        answer: 'dgfsdf'
    }
    componentWillMount = async() => {
        const url = new URLSearchParams(window.location.search)
        this.setState({ questionid: `${url.get('item')}` })
        const questionsformDB = await axios({
            method: 'post',
            url: 'https://line-connect.freezer.in.th/api/question',
            data: {
                JWT: Cookie.get('JWT'),
                questionid:`${url.get('item')}`
            }
        })
        this.setState({ questions: questionsformDB.data.content })
        const getAnswer = await axios ({
            method: 'get',
            url: `https://registrant.service.freezer.in.th/api/answers/line/1`,
      
            headers: {
                'Authorization': `Bearer ${ Cookie.get('JWT')}`,
                'Content-Type': 'application/json'
              }
        })
        console.log(getAnswer)
    }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Question</h1>
                <div className='col-12'>
                    <div className='row'>
                        <p>{this.state.questionid}. {this.state.questions}</p><br></br>
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
