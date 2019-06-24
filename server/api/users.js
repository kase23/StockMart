const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      //select only the id and email fields
      attributes: ["id", "email"]
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  const { total } = req.body;
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      const newMoney = user.money - total;
      await user.update({ money: newMoney });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//find in /auth
