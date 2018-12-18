import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import cookie from 'js-cookie'

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
  if (responseAllowline){
    window.location.href = 'https://www.google.com'
  }
}


class App extends Component {
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

export default App;
