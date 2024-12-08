import { Router } from "express";
import { UserService } from "../services/userService";

const router = Router();
const userService = new UserService();

router.post("/create", async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await userService.createUser(login, password);
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: JSON.stringify(error) });
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    const token = await userService.authenticateUser(login, password);
    res.status(200).json({ message: "Authentication successful", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: JSON.stringify(error) });
  }
});

export default router;
