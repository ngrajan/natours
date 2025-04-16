const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const connect = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(`DB Connection Successful`);
    })
    .catch((err) => console.error(`Error in DB Connection: ${err.message}`));
};
connect(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
