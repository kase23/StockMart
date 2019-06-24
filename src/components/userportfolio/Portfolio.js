import React from "react";
import { connect } from "react-redux";
import { getStocks } from "../../store/orderStore";

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getStocks(this.props.userid);
  }
  render() {
    const stocks = this.props.stocks;
    console.log(stocks);
    return (
      <>
        <ul>
          <li>Hello {this.props.name}!</li>
          <li>Current Portfolio Value: </li>
          <li>Users Stocks:</li>
        </ul>
        {stocks ? (
          stocks.map(stock => {
            return (
              <tr>
                <td>Stock Name: {stock.stockName}</td>
                {/* <td>Price: {transaction.price}</td>
              <td>Qty: {transaction.quantity}</td>
              <td>Total: {transaction.quantity}</td> */}
              </tr>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.orders.stocks,
    userid: state.user.id,
    name: state.user.name
  };
};

export default connect(
  mapStateToProps,
  { getStocks }
)(Portfolio);
