const express = require("express");
const taskDetailsService = require("../services/taskDetailsService");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:id", authMiddleware, taskDetailsService.getTask);
router.post("/", authMiddleware, taskDetailsService.createTask);
router.put("/:id", authMiddleware, taskDetailsService.updateTask);
router.delete("/:id", authMiddleware, taskDetailsService.deleteTask);

module.exports = router;
