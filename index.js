const app = require('./app.js');
const config = require('./app/config/config.js');
const PORT = config.app.port;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})