import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Component
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import ErrorTokenPage from './pages/ErrorTokenPage'
import ErrorNotRegisterPage from './pages/ErrorNotRegisterPage'
import ConnectedPage from './pages/ConnectedPage'
import SelectQuestion from './pages/ShowQuestions'
import Question from './pages/Question'
import LoginFace from './pages/LoginFace'

class Routes extends React.Component {
  render(){
    return(
      <Router>
          <div className="body">
            <Route exact path="/" component={HomePage} />
            <Route path="/status/success" component={SuccessPage} />
            <Route path="/status/errortoken" component={ErrorTokenPage} />
            <Route path="/status/errornotregister" component={ErrorNotRegisterPage} />
            <Route path="/status/connected" component={ConnectedPage} />
            <Route path="/selectquestion" component={SelectQuestion} />
            <Route path="/question" component={Question} />
            <Route path="/loginface" component={LoginFace} />
          </div>
      </Router>
    )
  }
}

export default Routes