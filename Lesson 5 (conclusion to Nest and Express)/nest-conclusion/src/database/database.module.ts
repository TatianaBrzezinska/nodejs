import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'admin',
  password: 'adminpassword',
  database: 'usersdb',
});

@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useValue: pool,
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
