import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login'
import Cookies from 'js-cookie'
import styled from 'styled-components'

const Loading = styled.div`
  position: absolute;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: black;
`
let line
class Home extends Component {
  state = {
    param: '',
    data: {},
    loading: 'block'
  }

  componentDidMount = async () => {
    if (!Cookies.get('codeLine')) {
      const url = await new URLSearchParams(window.location.search)
      await Cookies.set('codeLine', url.get('code'))
    }
    const responseLine = await axios({
      method: 'post',
      url: `${window.env.PATH_BE}/auth`,
      data: {
        code: Cookies.get('codeLine'),
      },
    })
     line = responseLine.data
    const sendLine = {
      provider_id: line.userId,
      provider_name: 'line',
      accessToken: line.accessToken,
    }
    let JWT = await axios.post(`${window.env.PATH_AUTH}/auth/login`, sendLine)
    if(JWT.data.token){
      console.log('auth in',JWT)
    Cookies.remove('codeLine')
    Cookies.set('JWT', JWT.data.token)
    window.location.href = `${window.env.PATH_FE}/status/connected`
    }

    setTimeout(() => {
      this.setState({
        loading: 'none'
      })
    }, 7000)
    
  }

  responseFacebook = async (res) => {
    const facebook = res
    Cookies.remove('codeLine')
    console.log('auth in line',line)
    console.log('auth in face',res)
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
      const sendLine = {
        provider_id: line.userId,
        provider_name: 'line',
        accessToken: line.accessToken,
      }

      if (await res.data.status) {
        let JWT = await axios.post(`${window.env.PATH_AUTH}/auth/login`, sendLine)
        Cookies.set('JWT', JWT.data.token)
        window.location.href = `${window.env.PATH_FE}/status/connected`
      } else if(await res.data.error === 'Please Register By Facebook Account Before Connect With Line') {
        window.location.href = `${window.env.PATH_ITIM}`
      } else {
        window.location.href = `${window.env.PATH_FE}/status/errortoken`
      }
    })
  }


  render() {
    return (
      <div className="App">
        <div >
          <Loading style={{ display: this.state.loading }} />
          <FacebookLogin
            redirectUri="https://line-connect.freezer.in.th/"
            appId="293604811359850"
            callback={this.responseFacebook}
          />
        </div>
      </div>
    );
  }
}

export default Home;
