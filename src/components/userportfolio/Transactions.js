import React from "react";
import { connect } from "react-redux";
import { getOrders } from "../../store/orderStore";

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const transactions = this.props.transactions;
    return (
      <div className="container">
        Users Transactions:
        {transactions ? (
          transactions.map(transaction => {
            return (
              <tr>
                <td>Stock Name: {transaction.stockName}</td>
                <td>Price: {transaction.price}</td>
                <td>Qty: {transaction.quantity}</td>
                <td>Total: {transaction.quantity}</td>
              </tr>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.orders.orders
  };
};

export default connect(
  mapStateToProps,
  { getOrders }
)(Transactions);
