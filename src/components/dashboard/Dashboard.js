import React, { Component } from "react";
import Transactions from "../userportfolio/Transactions";
import Portfolio from "../userportfolio/Portfolio";
import CreateOrder from "../userportfolio/CreateOrder";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <Transactions />
        <CreateOrder />
      </div>
    );
  }
}

export default Dashboard;
