import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/authStore";

const SignedInLinks = ({ handleClick }) => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/transactions">Transactions</NavLink>
      </li>
      <li>
        <a href="#" onClick={handleClick}>
          Sign Out
        </a>
      </li>
    </ul>
  );
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  null,
  mapDispatch
)(SignedInLinks);
