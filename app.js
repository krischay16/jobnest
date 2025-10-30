
var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

const dbModel=require('./model/dbModel')

const routing=require('./routes/routing')

const cors=require('cors')

// auth middleware is applied per-route in `routes/routing.js` where needed
// (do not apply globally so signup/login can be public)

var app = express();

app.use(cors())

// view engine setup


 

app.use(express.json());


 

app.get('/',async(req,res,next)=>{

  await dbModel.connect()

  console.log("connected to mango successfully");

  next();

})

app.use('/', routing);

// Error handler — return JSON instead of HTML
app.use((err, req, res, next) => {
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ error: err && err.message ? err.message : 'Internal server error' });
});




 

app.listen(3000)


 

module.exports = app;

