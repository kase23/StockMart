import React, { Component } from "react";
import { connect } from "react-redux";
//import {auth}
import { signup } from "../../store/rootreducer";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    uname: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className="container row">
        <div className="col s8">
          <form className="white" onSubmit={this.props.handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                id="uname"
                onChange={this.handleChange}
                value={this.state.uname}
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
            {this.props.error && this.props.error.response && (
              <div>{this.props.error.response.data}</div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapSignup = state => {
  return {
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const uname = evt.target.uname.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(signup(uname, email, password));
    }
  };
};

export default connect(
  mapSignup,
  mapDispatch
)(SignUp);
