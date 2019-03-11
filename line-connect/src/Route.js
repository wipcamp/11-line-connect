import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Component
import HomePage from "./pages/HomePage";
import CheckJWT from "./pages/CheckJWTPage";
import ErrorTokenPage from "./pages/ErrorTokenPage";
import ErrorNotRegisterPage from "./pages/ErrorNotRegisterPage";
import ErrorPage from "./pages/ErrorPage";
import SelectQuestion from "./pages/SelectQuestions";
import Question from "./pages/Question";
import EditProfile1 from "./pages/EditProfile1Page";
import EditProfile2 from "./pages/EditProfile2Page";
import EditProfile3 from "./pages/EditProfile3Page";
import EditProfile4 from "./pages/EditProfile4Page";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className="body">
          <Route exact path="/" component={HomePage} />
          <Route path="/checkjwt" component={CheckJWT} />
          <Route path="/status/errortoken" component={ErrorTokenPage} />
          <Route path="/status/error" component={ErrorPage} />
          <Route
            path="/status/errornotregister"
            component={ErrorNotRegisterPage}
          />
          <Route path="/selectquestion" component={SelectQuestion} />
          <Route path="/question" component={Question} />
          <Route path="/editprofile1" component={EditProfile1} />
          <Route path="/editprofile2" component={EditProfile2} />
          <Route path="/editprofile3" component={EditProfile3} />
          <Route path="/editprofile4" component={EditProfile4} />
        </div>
      </Router>
    );
  }
}

export default Routes;
