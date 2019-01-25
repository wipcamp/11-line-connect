import React, { Component } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Cookies from 'js-cookie'
import Loging from 'react-page-loading'
import ReactLoading from 'react-loading';
class Home extends Component {
  state = {
    param: '',
    data: {},
    nameLine: ''
  }
  
  responseFacebook = async (res) => {
    const url = new URLSearchParams(window.location.search)
    const response = await axios({
      method: 'post',
      url: `${window.env.PATH_BE}/auth`,
      data: {
        code: `${url.get('code')}`,
      },
    }).catch(err => {
      console.log(err)
    })
    const line = response.data
    const facebook = res

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
      }
    })
  }


  render() {
    const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1638650000&redirect_uri=${window.env.PATH_FE}&state=asdasd&scope=openid%20profile`
    
    return (
      <div className="App">
        <div >
          <FacebookLogin
            scope="email"
            fields="name,email,picture,id"
            appId="293604811359850"
            version="3.2"
            redirectUri={url}
            callback={this.responseFacebook}
            render={renderProps => (
              <button size="large " block type="primary" onClick={renderProps.onClick}>Login!</button>
            )}
          />
        </div>
        {/* <Loging loader={"bar"} color={"#A9A9A9"} size={4} duration={1}>
          <h1>Title</h1>
          <p>content goes here</p>
        </Loging> */}
        {/* <ReactLoading type={this.props.type} color={this.props.color} height={667} width={375} /> */}
      </div>
    );
  }
}

export default Home;
