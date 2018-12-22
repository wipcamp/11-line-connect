import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

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
  console.log('line, ', response.data)
  console.log('facebook', res)

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
  console.log(responseAllowline.data.error)
  if(responseAllowline.data.error==='Invalid Line Account' || responseAllowline.data.error==='Invalid Facebook Account'){
    window.location.href = 'https://localhost:3000/status/errortoken'
  }else if(responseAllowline.data.error==='Please Register By Facebook Account Before Connect With Line'){
    window.location.href = 'https://localhost:3000/status/errornotregister'
  }else if(responseAllowline.data.error==='You already connect'){
    window.location.href = 'https://localhost:3000/status/connected'
  }else{
    window.location.href = 'https://localhost:3000/status/success'
  }
}


class Home extends Component {
  state = {
    param: '',
    data: {}
  }
  componentDidMount = async () => {
  }
  render() {
    console.log('render')
    return (
      <div className="App">
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

      </div>
    );
  }
}

export default Home;
