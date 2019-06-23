const router = require("express").Router();
const { User, Order } = require("../db/models");
// const {
//   isLoggedIn,
//   isAdmin,
//   isLoggedInAsSelf
//   // isLoggedInEditReview
// } = require("./userTypeChecker");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({});
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
//post orders
// took out isLoggedInAsSelf
router.post("/:userId", async (req, res, next) => {
  const { stockName, quantity, price = 10, total = 10 } = req.body;
  console.log(req.body);
  console.log("hi here at post");
  try {
    const order = await Order.create({
      stockName,
      quantity,
      price,
      total,
      userId: req.params.userId
    });
    res.json({ order });
  } catch (err) {
    // if (err.name === "SequelizeUniqueConstraintError") {
    //   res.status(401).send("Empty");
    // } else {
    next(err);
  }
});
