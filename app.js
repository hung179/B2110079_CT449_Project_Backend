const express = require('express')
const morgan = require('morgan')
const router = require('./app/routes/')
const ApiError = require('./app/api-error')
const app = express()

app.use(morgan('combined'));
app.use(express.json());
router(app);

app.use((req, res, next) => {
    return next( new ApiError(404, 'Not Found'));
  });
  app.use((error, req, res, next) => {
      return res.status(error.statusCode || 500).json({
          message: error.message || "Internal Server Error",
      })
  });
module.exports = app;
