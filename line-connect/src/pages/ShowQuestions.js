import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'



class ShowQuestions extends Component {
    state = {
        questions: [1,2,3,4,5,6],
    }
    handleQuestion(props) {
        window.location.href = `/question?item=${props}`
    }
    // componentDidMount = async () => {
    //     const questions = await axios({
    //         method: 'post',
    //         url: '',
    //         data: {
    //             JWT: Cookie.get('JWT')
    //         }
    //     })
    //     this.setState({ questions: questions })
    // }
    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Choose Question</h1>
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
