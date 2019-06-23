const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4000;
//database stuff
const db = require("./db");

//create tables if not created
const syncDb = () => db.sync();
syncDb();

//const sessionStore = new SequelizeStore({ db });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("errro: " + err));
//send sever hompage
app.get("/", function(req, res) {
  res.send("this is the homepage");
});
//send clinet to routes when needed
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

//start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
