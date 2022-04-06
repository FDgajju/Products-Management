const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: `${__dirname}/../config.env` });

const DB =
  process.env.DATABASE || 'mongodb://localhost:27017/DBProductManagement';
mongoose
  .connect(DB)
  .then(() => console.log(`mongodb running...`))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Express is running on PORT ${port}...`);
});
