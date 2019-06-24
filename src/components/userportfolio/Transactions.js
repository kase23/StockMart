import React from "react";
import { connect } from "react-redux";
import { getOrders } from "../../store/orderStore";

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.userid);
  }

  render() {
    const transactions = this.props.transactions;
    return (
      <>
        <div className="container flow-text">
          <ul>
            <li>Current Cash: ${this.props.cash} </li>
            <li>List of transactions</li>
          </ul>
        </div>

        <table className="container">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Quantity Purchased</th>
              <th>Stock Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions ? (
              transactions.map(transaction => {
                return (
                  <tr>
                    <td>{transaction.stockName}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.price}</td>
                    <td>{transaction.total}</td>
                    <td>{transaction.createdAt}</td>
                  </tr>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.orders.orders,
    userid: state.user.id,
    cash: state.user.money
  };
};

export default connect(
  mapStateToProps,
  { getOrders }
)(Transactions);
