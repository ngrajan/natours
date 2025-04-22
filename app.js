const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// !Bug
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `The page ${req.originalUrl} is not found`,
  });

  const err = new Error(`Can't find ${req.originalUrl}on this server`);
  err.statusCode = 404;
  err.status = 'fail';

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
