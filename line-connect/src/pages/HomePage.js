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
    nameLine :''
  }
  responseFacebook = async (res) => {
    const url = new URLSearchParams(window.location.search)
    
    const response = await axios({
      method: 'post',
      url: 'https://line-connect.freezer.in.th/api/auth',
      data: {
        code: `${url.get('code')}`,
      },
    }).catch(err => {
      console.log(err)
    })
    const line = response.data
  this.setState({ nameLine: line.displayName  }) 

    const facebook = res
    await axios({
      method: 'post',
      url:`https://auth.service.freezer.in.th/api/auth/connect`,
      data: {
        provider_fb: facebook.userID,
        accessTokenFB: facebook.accessToken,
        provider_line: line.userId,
        accessTokenLine: line.accessToken
      }
    }).then(async (res)=>{
      console.log('line, ', line)
      console.log('facebook', facebook)
      console.log('respons', res.data.status)
    
      const sendLine = {
        provider_id: line.userId,
        provider_name: 'line',
        accessToken: line.accessToken,
      }
      Cookies.remove('test')
      Cookies.set('test',res.data.status)
      // if (await res.data.status) {
        let JWT = await axios.post(`https://auth.service.freezer.in.th/api/auth/login`, sendLine)
        console.log(JWT.data.token)
        Cookies.set('JWT', JWT.data.token)
         window.location.href = 'https://line-connect.freezer.in.th/status/connected'
      // }
    })
  }
  
  render() {
    console.log('render')
    return (
      <div className="App">
        {Cookies.get('test')}          
       {this.state.nameLine}
        <div >
          <p>{this.state.param}</p>
          <FacebookLogin
            scope="email"
            fields="name,email,picture,id"
            appId="293604811359850"
            callback={this.responseFacebook}
            render={renderProps => (
              <button size="large " block type="primary" onClick={renderProps.onClick}>Login!</button>
            )}
          />
          <div>
            <button onClick={this.handleAPi}>test</button>
          </div>

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
