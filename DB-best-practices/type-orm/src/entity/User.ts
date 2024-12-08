import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @Column()
  someRandomColumn!: string;
}
