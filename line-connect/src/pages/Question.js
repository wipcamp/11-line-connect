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
        question: 'กำลังโหลดคำถาม',
        answer: 'กำลังโหลดคำตอบ',
        statusAns: 'disabled'
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
        this.setState({ question: questionsformDB.data.question.content,
            answer:questionsformDB.data.answer[0].ans_content })
        // const getAnswer = await axios ({
        //     method: 'get',
        //     url: `https://registrant.service.freezer.in.th/api/answers/line/1`,
      
        //     headers: {
        //         'Authorization': `Bearer ${ Cookie.get('JWT')}`,
        //         'Content-Type': 'application/json'
        //       }
        // })
        console.log(questionsformDB)
    }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Question</h1>
                <div className='col-12'>
                    <div className='row'>
                        <p>{this.state.questionid}. {this.state.question}</p><br></br>
                        <textarea value={this.state.answer} disabled={this.state.statusAns} className='col-12' style={{height:'150px'}}></textarea>
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
