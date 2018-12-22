import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Component
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import ErrorTokenPage from './pages/ErrorTokenPage'
import ErrorNotRegisterPage from './pages/ErrorNotRegisterPage'
import ConnectedPage from './pages/ConnectedPage'
// import CreateRoom from './components/CreateRoom'
// import AdminPage from './components/AdminPage'
// import TimePage from './components/TimePage'
const Aaa = () => (
        <div>sdsd</div>
)

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
            {/* <Route path="/status/errortoken" component={ErrorTokenPage} /> */}
            {/* <Route path="/createroom" component={CreateRoom} />
            <Route path="/adminpage" component={AdminPage} />
            <Route path="/timepage" component={TimePage} /> */}
          </div>
      </Router>
    )
  }
}

export default Routes