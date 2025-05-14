const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      // eslint-disable-next-line
      console.log(`DB Connection Successful`);
    })
    // eslint-disable-next-line
    .catch((err) => console.error(`Error in DB Connection: ${err.message}`));
};
connect(process.env.MONGO_URI);

const server = app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
