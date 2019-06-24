import React, { Component } from "react";
import { connect } from "react-redux";
import { addOrder } from "../../store/orderStore";
import axios from "axios";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: "",
      quantity: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/orders/${this.props.userid}`, {
        stockName: this.state.stockName,
        quantity: this.state.quantity
      })
      .then(response => {
        this.props.submitOrder({
          stock: this.state.stockName,
          quantity: this.state.quantity
        });
        this.setState({
          stockName: "",
          quantity: ""
        });
      })
      .catch(err => console.log(err));

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
            <input
              type="text"
              id="stockName"
              onChange={this.handleChange}
              value={this.state.stockName}
            />
          </div>

          <div className="input-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapProps = state => {
  return {
    userid: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitOrder: order => dispatch(addOrder(order))
  };
};

export default connect(
  mapProps,
  mapDispatchToProps
)(CreateOrder);
