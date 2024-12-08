import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../ormconfig";

export class UserService {
  async createUser(login: string, password: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { login } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = userRepository.create({ login, password: hashedPassword });
    return userRepository.save(user);
  }

  async authenticateUser(
    login: string,
    password: string,
  ): Promise<{ status: string }> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { login } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return { status: "Password is verified" };
  }
}
