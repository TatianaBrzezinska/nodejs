import { Router } from "express";
import { AppDataSource } from "../../ormconfig";
import { Car } from "../entity/Car";
import { PaginatedResult } from "../types/PaginatedResult";

const router = Router();

router.get("/get-cars", async (req, res) => {
  try {
    const carRepository = AppDataSource.getRepository(Car);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const totalCars = await carRepository.count();
    const totalPages = Math.ceil(totalCars / pageSize);
    const cars = await carRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const result: PaginatedResult<Car, number, number> = {
      page,
      totalPages,
      pageSize,
      totalItems: totalCars,
      items: cars,
    };
    res.json(result);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
