import React, { Component } from "react";
import Portfolio from "../userportfolio/Portfolio";
import CreateOrder from "../userportfolio/CreateOrder";

class Dashboard extends Component {
  render() {
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
  }
}

export default Dashboard;
