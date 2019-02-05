import React, { Component } from 'react';
import styled from 'styled-components'
import Authline from './../service/AuthLine'
import axios from 'axios'
import Cookie from 'js-cookie'
require('dotenv').config()


class ShowQuestions extends Component {
    state = {
        questions: [],
    }
    handleQuestion(props) {
        window.location.href = `/question?item=${props}`
    }
    componentDidMount = async () => {
        const questionsformDB = await axios({
            method: 'post',
            url: `${window.env.PATH_BE}/questions`,
            data: {
                JWT: Cookie.get('JWT')
            }
        })
        if (questionsformDB.data==='getquestionsProblem') {
            window.location.href = `${window.env.PATH_FE}/login`
        }
        this.setState({ questions: questionsformDB.data })
    }
    render() {
        if(!Cookie.get('JWT')){
            const url =  new URLSearchParams(window.location.search)
          let JWT =  Authline.login( url.get('code'))
          if(JWT.data){
            Cookie.set('JWT', JWT.data.token)
          }else{
            window.location.href = `${window.env.PATH_FE}/ErrorTokenPage`              
          }
        }
        return (
            <div className='container'>
                <h1 className='text-center'>Choose Question</h1>
                <h2>{Cookie.get('JWT')}</h2>
                <div className='col-12'>
                    <div className='row'>
                        {this.state.questions.map((item, index) => (
                        <div className='col-6 col-sm-4 text-center mt-5'>
                            <p onClick={() => this.handleQuestion(index+1)} >{index+1}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowQuestions;
