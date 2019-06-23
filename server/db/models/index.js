const User = require("./user");
const Order = require("./order");

Order.belongsTo(User);
User.hasMany(Order);

//this has to be fixed this is to get all tranactions
User.getUserTransactions = id => {
  return User.findByPk(id, {
    include: [{ model: Order }],
    attributes: { exclude: ["password"] }
  });
};

// we need function to groupby stock name for portfolio
//User.getUserStocks

// const getUserTransactions = await User.findAll({
//   include: [{ model: Owner }]
// });

module.exports = {
  User,
  Order
};
