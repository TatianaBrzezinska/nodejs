const express = require('express');
const { consumeOrders } = require('./consumer');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/notifications', routes);

app.listen(3001, () => {
  console.log('Notifications service running on port 3001');
  consumeOrders();
});
