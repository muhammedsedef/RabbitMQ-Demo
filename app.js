const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const postsRoute = require('./routes/post.route');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  };
  next();
});
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('We are on API Home');
});


app.use('/posts', postsRoute);


//MongoDb Connection
mongoose.Promise = Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
var mongooseOptions = { useNewUrlParser: true };

mongoose
  .connect(process.env.DB_CONNECTION, mongooseOptions)
  .then(() => {
    console.log("DataBase Connection Successful!");
  })
  .catch(err => {
    console.log("DataBase Connection Failed!" + err);
  });


module.exports = app;



