import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookie from 'js-cookie'
import Loging from 'react-page-loading'

const responseFacebook = async (res) => {
  const url = new URLSearchParams(window.location.search)
  const response = await axios({
    method: 'post',
    url: 'http://localhost:5000/api/auth',
    data: {
      code: `${url.get('code')}`,
    },
  }).catch(err => {
    console.log(err)
  })
  const line = response.data
  const facebook = res

  const responseAllowline = await axios({
    method: 'post',
    url: 'http://localhost:8000/api/auth/connect',
    data: {
      provider_fb: facebook.userID,
      accessTokenFB: facebook.accessToken,
      provider_line: line.userId,
      accessTokenLine: line.accessToken
    }
  })
  console.log('line, ', line)
  console.log('facebook', facebook)
  console.log('respons', responseAllowline.data.status)

  const sendLine = {
    provider_id: line.userId,
    provider_name: 'line',
    accessToken: line.accessToken,
  }

  if (await responseAllowline.data.status) {
    let JWT = await axios.post('http://localhost:8000/api/auth/login', sendLine)
    console.log(JWT.data.token)
    Cookie.set('JWT', JWT.data.token)
  }
  // const response = await axios({
  //   method: 'post',
  //   url: 'http://localhost:5000/api/questions',
  //   data: {
  //     JWT: Cookie.get('JWT')
  //   },
  // }).catch(err => {
  //   console.log(err)
  // })
  // console.log(response)
  // }

  // if(responseAllowline.data.error==='Invalid Line Account' || responseAllowline.data.error==='Invalid Facebook Account'){
  //   window.location.href = 'https://localhost:3000/status/errortoken'
  // }else if(responseAllowline.data.error==='Please Register By Facebook Account Before Connect With Line'){
  //   window.location.href = 'https://localhost:3000/status/errornotregister'
  // }else if(responseAllowline.data.error==='You already connect'){
  //   window.location.href = 'https://localhost:3000/status/connected'
  // }else{
  //   window.location.href = 'https://localhost:3000/status/success'
  // }
}


class Home extends Component {
  state = {
    param: '',
    data: {}
  }
  componentDidMount = async () => {

  }
  handleAPi = () => {
    axios.post('https://wipcamp-testbot-joknoi.herokuapp.com/test')
  }

  render() {
    console.log('render')
    return (
      <div className="App">
        <script src="https://d.line-scdn.net/liff/1.0/sdk.js"></script>
        <div style={{display:'none'}}>
          <p>{this.state.param}</p>
          <FacebookLogin
            scope="email"

            fields="name,email,picture,id"
            appId="293604811359850"
            callback={responseFacebook}
            render={renderProps => (
              <button size="large " block type="primary" onClick={renderProps.onClick}>Login!</button>
            )}
          />
          <div>
            <button onClick={this.handleAPi}>test</button>
          </div>

        </div>
        <Loging loader={"bar"} color={"#A9A9A9"} size={4}>
          <h1>Title</h1>
          <p>content goes here</p>
        </Loging>


      </div>
    );
  }
}

export default Home;
