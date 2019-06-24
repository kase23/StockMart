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

module.exports = {
  User,
  Order
};
