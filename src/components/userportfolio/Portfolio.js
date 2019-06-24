import React from "react";
import { connect } from "react-redux";
import { getStocks } from "../../store/orderStore";
import axios from "axios";
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PortfolioValue: null
    };
  }
  async componentDidMount() {
    await this.props.getStocks(this.props.userid);
    let totalVal = 0;
    this.props.stocks.forEach(element => {
      this.getCurrentPrice(element.stockName).then(res => {
        element["cprice"] = res.currrent;
        element["open"] = res.open;
        totalVal += res.currrent * element.quantity;
        element.color = res.open - res.currrent < 0 ? "green" : "red";
        this.setState({
          PortfolioValue: totalVal
        });
      });
    });

    //console.log(this.props.stocks);
  }
  // for updating portfolio page after order..
  // componentDidUpdate(){
  //npm install deep
  //   //if old props != new props{
  //   // run props function
  //   }
  // }

  getCurrentPrice(stock) {
    const apikey = "pk_a91fd6cb299c4cacbeaa2d871b59b4ba";
    const base = "https://cloud.iexapis.com/stable/stock/";
    return axios.get(`${base}${stock}/quote?token=${apikey}`).then(res => {
      const openprice = parseFloat(res.data.open).toFixed(2);
      const cprice = parseFloat(res.data.latestPrice).toFixed(2);
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
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {stocks ? (
              stocks.map(stock => {
                return (
                  <tr>
                    <td>{stock.stockName}</td>
                    <td>{stock.quantity}</td>
                    <td style={{ color: stock.color }}>{stock.cprice}</td>
                    <td>{stock.cprice * stock.quantity}</td>
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
