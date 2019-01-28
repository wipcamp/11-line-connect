import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login'
import Cookies from 'js-cookie'
import styled from 'styled-components'

// import Loging from 'react-page-loading'
// import ReactLoading from 'react-loading';
const Loading = styled.div`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: black;
`
class Home extends Component {
  state = {
    param: '',
    data: {},
    loading: 'block'
  }
  componentDidMount = async () => {
    console.log(Cookies.get('codeLine'))
    if (Cookies.get('codeLine') === undefined) {
      const url = await new URLSearchParams(window.location.search)
      await Cookies.set('codeLine', url.get('code'))
    //  await axios({
    //     method: 'post',
    //     url: `${window.env.PATH_BE}/auth`,
    //     data: {
    //       code: Cookies.get('codeLine'),
    //     },
    //   }).then(async(responseLine)=>{
    //     const line = responseLine.data
    //     console.log(line)
    //     const sendLine = {
    //       provider_id: line.userId,
    //       provider_name: 'line',
    //       accessToken: line.accessToken,
    //     }
    //       let JWT = await axios.post(`${window.env.PATH_AUTH}/auth/login`, sendLine)
    //       Cookies.set('JWT', JWT.data.token)
          
    //   })
   
        // window.location.href = `${window.env.PATH_FE}/status/connected`
    }
    setTimeout(() => {
      this.setState({
        loading: 'none'
      })
    },7000)
  }
  responseFacebook = async (res) => {
    const facebook = res
    console.log(facebook)
    const responseLine = await axios({
      method: 'post',
      url: `${window.env.PATH_BE}/auth`,
      data: {
        code: Cookies.get('codeLine'),
      },
    })
    const line = responseLine.data
    console.log(line)
    // if (line === 'auth lineproblem') {
    //   window.location.href = `${window.env.PATH_FE}/login`
    // }
    
    await axios({
      method: 'post',
      url: `${window.env.PATH_AUTH}/auth/connect`,
      data: {
        provider_fb: facebook.userID,
        accessTokenFB: facebook.accessToken,
        provider_line: line.userId,
        accessTokenLine: line.accessToken
      }
    }).then(async (res) => {
      Cookies.remove('codeLine')
      const sendLine = {
        provider_id: line.userId,
        provider_name: 'line',
        accessToken: line.accessToken,
      }
      if (await res.data.status) {
        let JWT = await axios.post(`${window.env.PATH_AUTH}/auth/login`, sendLine)
        Cookies.set('JWT', JWT.data.token)
        window.location.href = `${window.env.PATH_FE}/status/connected`
      }
    })
  }
  

  render() {
    return (
      <div className="App">
        <div >
          <Loading style={{ display: this.state.loading }}/>
          <FacebookLogin
            appId="293604811359850"
            callback={this.responseFacebook}
          />
        </div>
      </div>
    );
  }
}

export default Home;
