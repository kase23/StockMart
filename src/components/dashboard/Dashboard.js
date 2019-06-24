import React, { Component } from "react";
import Portfolio from "../userportfolio/Portfolio";
import CreateOrder from "../userportfolio/CreateOrder";
import SignIn from "../auth/SignIn";

const Dashboard = props => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) return <SignIn />;
  else
    return (
      <div className="dashboard container row">
        <div className="col s6">
          <Portfolio />
        </div>
        <div className="col s6">
          <CreateOrder />
        </div>
      </div>
    );
};

export default Dashboard;
