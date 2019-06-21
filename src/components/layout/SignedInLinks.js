import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">New Order</NavLink>
      </li>
      <li>
        <NavLink to="/">Sign Out</NavLink>
      </li>{" "}
      <li>
        <NavLink to="/">User</NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
