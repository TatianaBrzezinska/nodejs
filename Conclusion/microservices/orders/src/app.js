const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use('/orders', routes);

app.listen(3000, () => console.log('Orders service running on port 3000'));
