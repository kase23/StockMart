import React, { Component } from "react";

class CreateOrder extends Component {
  state = {
    stockName: "",
    password: "",
    priceOfStock: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);
    // try {
    //   fetch(
    //     "https://cloud.iexapis.com/stable/tops?token=pk_a91fd6cb299c4cacbeaa2d871b59b4ba&symbols=aapl"
    //   )
    //     .then(response => response.json())
    //     .then(data => {
    //       const price = data[0].lastSalePrice;
    //       this.setState({
    //         priceOfStock: price
    //       });
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
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
        Price: {this.state.priceOfStock}
      </div>
    );
  }
}

export default CreateOrder;
