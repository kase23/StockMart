import React from "react";
import { connect } from "react-redux";
import { getStocks } from "../../store/orderStore";
import axios from "axios";
import { watchFile } from "fs";
import { async } from "q";
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PortfolioValue: ""
    };
  }
  async componentDidMount() {
    await this.props.getStocks(this.props.userid);
  }
  componentDidUpdate() {
    this.props.getStocks(this.props.userid);
  }

  getCurrentPrice(stock = "AMZN") {
    const apikey = "pk_a91fd6cb299c4cacbeaa2d871b59b4ba";
    const base = "https://cloud.iexapis.com/stable/stock/";
    axios.get(`${base}${stock}/quote?token=${apikey}`).then(res => {
      const openprice = parseFloat(res.data.open);
      const cprice = parseFloat(res.data.latestPrice);
      //console.log(openprice, cprice);
      return { open: openprice, currrent: cprice };
    });
  }

  render() {
    const stocks = this.props.stocks;
    return (
      <div className="container">
        <div className="flow-text">
          <ul>
            <li>Hello {this.props.name}!</li>
            <li>Current Portfolio Value: ${this.state.PortfolioValue} </li>
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
                    {/* <td>{this.getCurrentPrice(stock.stockName)}</td> */}
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
