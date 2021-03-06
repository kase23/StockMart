import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { me } from "../../store/authStore";
import { getStocks } from "../../store/orderStore";
import history from "../../history";
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
    const stock = this.state.stockName.toUpperCase();
    const quantity = this.state.quantity;
    //public api key for IEX cloud API
    const apikey = "pk_a91fd6cb299c4cacbeaa2d871b59b4ba";
    const base = "https://cloud.iexapis.com/stable/stock/";
    // get the price of the stock to see if there are enough funds for the quantity needed
    axios
      .get(`${base}${stock}/price?token=${apikey}`)
      .then(res => {
        const price = parseFloat(res.data);
        const totalPrice = quantity * price;
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
        this.setState({
          error: "Incorrect Ticker Symbol"
        });
      });
  };

  submitOrdertodb = price => {
    axios
      .post(`/api/orders/${this.props.userid}`, {
        stockName: this.state.stockName.toUpperCase(),
        quantity: this.state.quantity,
        price: price,
        total: this.state.quantity * price
      })
      .then(() => {
        axios
          .put(`/api/users/${this.props.userid}`, {
            total: this.state.quantity * price
          })
          .then(() => {
            this.props.updateUser();
            this.props.getStocks(this.props.userid);
          })
          .catch(err => console.log(err));
        this.setState({
          stockName: "",
          quantity: ""
        });
        history.push("/transactions");
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
    updateUser: () => dispatch(me()),
    getStocks: userid => dispatch(getStocks(userid))
  };
};

export default connect(
  mapProps,
  mapDispatchToProps
)(CreateOrder);
