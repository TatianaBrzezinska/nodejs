import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id!: number | undefined;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;
}
