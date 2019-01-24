import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'
// const Box = styled.div`
//     background-color: green;
// `
require('dotenv').load();

class Question extends Component {
    state = {
        questionid: 0,
        question: 'กำลังโหลดคำถาม',
        answer: 'กำลังโหลดคำตอบ',
        statusAns: 'disabled',
        statusEdit: '',
        ans: '',
    }
    componentDidMount = async () => {
        const url = new URLSearchParams(window.location.search)
        this.setState({ questionid: `${url.get('item')}` })
        const questionsformDB = await axios({
            method: 'post',
            url: `${process.env.PATH_REGISTANCE}/api/question`,
            data: {
                JWT: Cookie.get('JWT'),
                questionid: `${url.get('item')}`
            }
        })
        if (questionsformDB.data.answer[0]) {
            this.setState({
                question: questionsformDB.data.question.content,
                answer: questionsformDB.data.answer[0].ans_content
            })
        } else {
            this.setState({
                question: questionsformDB.data.question.content,
                answer: '',
                statusAns: '',
                statusEdit: 'disabled'
            })
        }

    }
    handleAnswerByButton = () => {
        this.setState({
            statusAns: ''
        })
    }
    handleAnswer = (e) =>  {
        this.setState({
            answer: e.target.value
        })
    }
    handleSendAnswer = async() => {
        await axios({
            method: 'post',
            url: `${process.env.PATH_REGISTANCE}/api/sendAnswer`,
            data: {
                JWT: Cookie.get('JWT'),
                questionid: this.state.questionid,
                content: this.state.answer
            }
        }).then(() => {
            window.location.href = `${process.env.PATH_FE}/selectquestion`
        })
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Question</h1>
                <div className='col-12'>
                    <div className='row'>
                        <p>{this.state.questionid}. {this.state.question}</p><br></br>
                        <textarea value={this.state.answer} disabled={this.state.statusAns} onChange={this.handleAnswer} className='col-12' style={{ height: '150px' }}></textarea>
                        <div className='col-12 mt-3'>
                            <div className='row float-right'>
                                <div className='inline-block mr-2'><button type="button" class="btn btn-warning" onClick={this.handleAnswerByButton} disabled={this.state.statusEdit}>แก้ไขคำตอบ</button></div>
                                <div className='inline-block'><button type="button" class="btn btn-info" onClick={this.handleSendAnswer}>ยืนยันคำตอบ</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;
