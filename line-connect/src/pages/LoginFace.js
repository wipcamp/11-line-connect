import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class LoginFace extends Component {
  responseFacebook () {
  }
  render () {
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1638650000&redirect_uri=${window.env.PATH_FE}&state=asdasd&scope=openid%20profile`
    return (
      <div className='App'>
        <div>
          {/* <FacebookLogin
            appId='293604811359850'
            version='3.2'
            autoLoad={true}
            fields='name,email,picture'
            callback={this.responseFacebook}
            render={renderProps => (
              <button onClick={renderProps.onClick}>This is my custom FB button</button>
            )}
            ></FacebookLogin> */}
        </div>
      </div>
    )
  }
}

export default LoginFace
