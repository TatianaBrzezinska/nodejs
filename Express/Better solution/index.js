const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const index = express();
const port = require('./config/config').port;
index.use(express.json());
index.use('/api/users', authMiddleware, userRoutes);
index.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
