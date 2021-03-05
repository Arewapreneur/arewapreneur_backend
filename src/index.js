const path = require('path')
const dotenv = require('dotenv')
const server = require('./server')
const configFile = path.join(__dirname, '../.env');
dotenv.config({ path: configFile });

const runServer = async () => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`server started on /:${PORT}`);
  });
};

runServer();
