import {
  Injectable,
  Inject,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    try {
      const result = await this.pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password],
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException('Database error');
    }
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM users');
    return result.rows;
  }

  async findOne(id: number) {
    const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    return result.rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const query = `UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *`;
    const values = [updateUserDto.username, updateUserDto.password, id];

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  }
}
