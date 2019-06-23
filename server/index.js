const path = require("path");
const express = require("express");
//const bodyParser = require("body-parser");
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4000;
//authentication reqs
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//database stuff
const db = require("./db");

//authentication stuff
const sessionStore = new SequelizeStore({ db });

//create tables if not created
const syncDb = () => db.sync();
async function bootApp() {
  await sessionStore.sync();
}
bootApp();
syncDb();

//passport
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.getUserTransactions(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// start app
const app = express();

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("errro: " + err));

app.use(
  session({
    secret: "tppstocks",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

//send sever hompage
app.get("/", function(req, res) {
  res.send("this is the homepage");
});
//send client to routes when needed
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

//start the server
app.listen(PORT, console.log(`Server started on port ${PORT}`));
