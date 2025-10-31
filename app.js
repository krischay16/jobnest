const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbModel = require('./model/dbModel');
const routing = require('./routes/routing');
const cors = require('cors');
const auth=require('./auth/auth');
const app = express();

// ✅ Connect to DB at startup
dbModel.connect()
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// ✅ Mount your routes
app.use('/api', auth,routing); // Example of using auth middleware
app.use('/', routing);

// ✅ Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = app;
