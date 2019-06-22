const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const ENV = process.env.NODE_ENV;

const PORT = process.env.PORT || 5000;

const app = express();
