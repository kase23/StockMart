import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../store/rootreducer";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className="container row">
        <div className="col s7">
          <form className="white" onSubmit={this.props.handleSubmit}>
            <h5 className="grey-text text-darken-3">Sign In</h5>

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
              <button className="btn pink lighten-1 z-depth-0">Login</button>
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
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password));
    }
  };
};

export default connect(
  mapSignup,
  mapDispatch
)(SignIn);
