import React from "react";
import { connect } from "react-redux";
import { getStocks } from "../../store/orderStore";

class Portfolio extends React.Component {
  componentDidMount() {
    this.props.getStocks(this.props.userid);
  }
  componentDidUpdate() {
    this.props.getStocks(this.props.userid);
  }
  render() {
    const stocks = this.props.stocks;
    return (
      <div className="container">
        <div className="flow-text">
          <ul>
            <li>Hello {this.props.name}!</li>
            <li>Current Portfolio Value: </li>
          </ul>
        </div>

        <table>
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Quantity Owned</th>
              <th>Current Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks ? (
              stocks.map(stock => {
                return (
                  <tr>
                    <td>{stock.stockName}</td>
                    <td>{stock.quantity}</td>
                  </tr>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </tbody>
        </table>
      </div>
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
