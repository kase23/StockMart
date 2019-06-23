const User = require("./user");
const Order = require("./order");

User.hasMany(Order);

//this has to be fixed this is to get all tranactions
User.getUserTransactions = id => {
  return User.findById(id, {
    attributes: { exclude: ["password"] }
  });
};

// we need function to groupby stock name for portfolio
//User.getUserStocks

module.exports = {
  User,
  Order
};
