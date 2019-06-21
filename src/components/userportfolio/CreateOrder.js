import React, { Component } from "react";

class CreateOrder extends Component {
  state = {
    stockName: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Purchase Stock</h5>

          <div className="input-field">
            <label htmlFor="stockName">Stock Name</label>
            <input type="text" id="stockName" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="number" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateOrder;
