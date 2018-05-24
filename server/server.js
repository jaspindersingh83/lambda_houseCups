//Packages
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Configs
const { dbuser, dbpassword } = require("./config");

//Cors
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credetials: true
//   };

const server = express();
const port = process.env.PORT || 8080;

//Global Middlewares
server.use(bodyParser.json());
server.use(morgan("combined"));
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));

//Creating Log Files
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);

//Running the auth routes
// const authRoutes = require('./auth/routes/routes')
// authRoutes(server);

///main
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${dbuser}:${dbpassword}@ds263759.mlab.com:63759/housecups`, {
    useMongoClient: true
  })
  .then(function() {
    server.listen(port, function() {
      console.log(`The databases are connected to server on ${port}`);
    });
  })
  .catch(function(err) {
    console.log("Database Connection Failed");
  });

module.exports = { server };
