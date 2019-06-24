const router = require("express").Router();
const { User, Order } = require("../db/models");
const sequelize = require("sequelize");
// const {
//   isLoggedInAsSelf
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

router.get("/:userid", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userid }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/stocks/:userid", async (req, res, next) => {
  try {
    const stocks = await Order.findAll({
      where: { userId: req.params.userid },
      attributes: [
        "stockName",
        [sequelize.fn("SUM", sequelize.col("quantity")), "quantity"]
      ],
      group: ["stockName"]
    });
    res.json(stocks);
  } catch (err) {
    next(err);
  }
});

//post orders
//isLoggedInAsSelf to protect?
router.post("/:userId", async (req, res, next) => {
  const { stockName, quantity, price, total } = req.body;
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
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("Empty");
    } else {
      next(err);
    }
  }
});
