import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateOrder from "./components/userportfolio/CreateOrder";
import Transactions from "./components/userportfolio/Transactions";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Dashboard isLoggedIn={isLoggedIn} />}
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/createOrder" component={CreateOrder} />
          <Route exact path="/transactions" component={Transactions} />
        </Switch>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

export default withRouter(connect(mapState)(App));

//export default App;
