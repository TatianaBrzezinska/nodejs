const express = require('express');
const tasksService = require('../services/tasksService');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, tasksService.getTasks);

module.exports = router;
