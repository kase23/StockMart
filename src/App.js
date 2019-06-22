import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateOrder from "./components/userportfolio/CreateOrder";
import Transactions from "./components/userportfolio/Transactions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/createOrder" component={CreateOrder} />
          <Route exact path="/transactions" component={Transactions} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
