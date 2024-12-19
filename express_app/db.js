const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME || "express_app", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5412,
  dialect: "postgres",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

module.exports = sequelize;
