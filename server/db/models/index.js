const User = require("./user");
const Order = require("./order");

Order.belongsTo(User);
User.hasMany(Order);

User.getUserTransactions = id => {
  return User.findByPk(id, {
    include: [{ model: Order }],
    attributes: { exclude: ["password"] }
  });
};

// const getUserTransactions = await User.findAll({
//   include: [{ model: Owner }]
// });

module.exports = {
  User,
  Order
};
