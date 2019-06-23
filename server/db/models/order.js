const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  stockName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
});

module.exports = Order;
