const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const { dbConnect } = require("./database/dbConnect");
const app = require('./app');

const port = process.env.PORT || 8080;

dbConnect();

app.listen(port, () => {
  console.log('Server is running on port', port);
});