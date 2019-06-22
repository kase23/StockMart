import React from "react";
import { connect } from "react-redux";

const Transactions = props => {
  const { transactions } = props;
  return (
    <div className="container">
      Users Transactions:
      {transactions ? (
        transactions.map(transaction => {
          return (
            <tr>
              <td>Stock Name: {transaction.stock}</td>
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
};

const mapStateToProps = state => {
  return {
    transactions: state.orders.orders
  };
};

export default connect(mapStateToProps)(Transactions);
