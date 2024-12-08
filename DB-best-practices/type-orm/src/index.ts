import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { AppDataSource } from "../ormconfig";
import carRoutes from "./routes/carRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/", carRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.log("Database connection error:", error));
