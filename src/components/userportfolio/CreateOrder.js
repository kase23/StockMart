import React, { Component } from "react";
import { connect } from "react-redux";
import { addOrder } from "../../store/orderStore";
import axios from "axios";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: "",
      quantity: "",
      error: null
    };
  }
  componentDidMount() {}
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const apikey = "pk_a91fd6cb299c4cacbeaa2d871b59b4ba";
    const stock = this.state.stockName.toUpperCase();
    const base = "https://cloud.iexapis.com/stable/stock/";
    axios
      .get(`${base}${stock}/price?token=${apikey}`)
      .then(res => {
        const price = parseFloat(res.data);
        const totalPrice = this.state.quantity * price;
        if (this.props.userCash - totalPrice > 0) {
          this.submitOrdertodb(price);
        } else {
          this.setState({
            error: "you do not have enough funds to complete this order"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitOrdertodb = price => {
    axios
      .post(`/api/orders/${this.props.userid}`, {
        stockName: this.state.stockName,
        quantity: this.state.quantity,
        price: price,
        total: this.state.quantity * price
      })
      .then(() => {
        axios
          .put(`/api/users/${this.props.userid}`, {
            total: this.state.quantity * price
          })
          .catch(err => console.log(err));
        this.setState({
          stockName: "",
          quantity: ""
        });
      })
      .catch(err => console.log(err));
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
          <div>{this.state.error}</div>
        </form>
      </div>
    );
  }
}

const mapProps = state => {
  return {
    userid: state.user.id,
    userCash: state.user.money
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
