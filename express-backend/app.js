const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const path = require("path");
// const graphqlHttp = require('graphql-http')

const app = express();
app.use(bodyParser.json()); // application/json
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

// app.use('graphql', graphqlHttp())

// mongo connect and with server
mongoose.connect(`mongodb://localhost:27017/exp_gql_app`).then((res) => {
  app.listen(8080);
});
