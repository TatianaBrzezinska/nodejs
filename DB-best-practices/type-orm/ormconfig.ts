import { DataSource } from "typeorm";
import { User } from "./src/entity/User";
import { Car } from "./src/entity/Car";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "postgres",
  entities: [User, Car],
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});
