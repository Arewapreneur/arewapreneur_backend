const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const server = require('./server')
const configFile = path.join(__dirname, '../.env');
dotenv.config({ path: configFile });

const databaseURL = process.env.MONGODB_URI
 // mongoose connection
 mongoose.connect(databaseURL, {
   useNewUrlParser: true ,
   useUnifiedTopology: true})
  .then(() => {
      console.log("<<:::>> Connected to Database")
  })
  .catch(err => {
      console.log("There was an error while connecting to the database.")
  })

const runServer = async () => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`server started on /:${PORT}`);
  });
};

runServer();
