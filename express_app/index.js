const express = require("express");
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");
const taskDetailsRoutes = require("./routes/task_details");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");

const app = express();

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("Database connection error:", err.stack);
  });

app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:4200",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/task_details", taskDetailsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong, please try again." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
