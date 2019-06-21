import React, { Component } from "react";
import Transactions from "./Transactions";
import Portfolio from "../userportfolio/Portfolio";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <Portfolio />
      </div>
    );
  }
}

export default Dashboard;
