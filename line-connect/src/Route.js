import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Component
import HomePage from "./pages/HomePage";
import ConnectSuccessPage from "./pages/ConnectSuccesPage";
import ErrorTokenPage from "./pages/ErrorTokenPage";
import ErrorNotRegisterPage from "./pages/ErrorNotRegisterPage";
import ErrorPage from "./pages/ErrorPage";
import ConnectedPage from "./pages/ConnectedPage";
import SelectQuestion from "./pages/SelectQuestions";
import Question from "./pages/Question";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className="body">
          <Route exact path="/" component={HomePage} />
          <Route path="/status/success" component={ConnectSuccessPage} />
          <Route path="/status/errortoken" component={ErrorTokenPage} />
          <Route path="/status/error" component={ErrorPage} />
          <Route
            path="/status/errornotregister"
            component={ErrorNotRegisterPage}
          />
          <Route path="/status/connected" component={ConnectedPage} />
          <Route path="/selectquestion" component={SelectQuestion} />
          <Route path="/question" component={Question} />
        </div>
      </Router>
    );
  }
}

export default Routes;
