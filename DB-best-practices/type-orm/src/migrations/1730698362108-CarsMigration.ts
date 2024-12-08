import { MigrationInterface, QueryRunner } from "typeorm";

export class CarsMigration1730698362108 implements MigrationInterface {
  name = "CarsMigration1730698362108";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "car" ("id" SERIAL NOT NULL, "make" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"));
    INSERT INTO "car" (make, model, year) VALUES
  ('Toyota', 'Camry', 2020),
  ('Honda', 'Accord', 2019),
  ('Ford', 'Focus', 2018),
  ('Chevrolet', 'Malibu', 2021),
  ('Nissan', 'Altima', 2017),
  ('Hyundai', 'Elantra', 2016),
  ('Kia', 'Optima', 2015),
  ('Mazda', 'Mazda3', 2020),
  ('Subaru', 'Impreza', 2019),
  ('Volkswagen', 'Jetta', 2018),
  ('BMW', '3 Series', 2021),
  ('Mercedes-Benz', 'C-Class', 2020),
  ('Audi', 'A4', 2019),
  ('Lexus', 'ES', 2021),
  ('Acura', 'TLX', 2020),
  ('Infiniti', 'Q50', 2018),
  ('Tesla', 'Model 3', 2022),
  ('Volvo', 'S60', 2017),
  ('Jaguar', 'XE', 2016),
  ('Alfa Romeo', 'Giulia', 2020),
  ('Cadillac', 'CT5', 2021),
  ('Chrysler', '300', 2019),
  ('Dodge', 'Charger', 2018),
  ('Mitsubishi', 'Lancer', 2015),
  ('Porsche', 'Panamera', 2020),
  ('Genesis', 'G70', 2021),
  ('Lincoln', 'MKZ', 2019),
  ('Buick', 'Regal', 2018),
  ('Fiat', '500L', 2017),
  ('Mini', 'Cooper', 2020),
  ('Peugeot', '508', 2022),
  ('Renault', 'Talisman', 2019),
  ('Seat', 'Leon', 2018),
  ('Skoda', 'Octavia', 2021),
  ('Saab', '9-3', 2016),
  ('Holden', 'Commodore', 2015),
  ('Suzuki', 'Kizashi', 2017),
  ('Citroen', 'C5', 2020),
  ('Opel', 'Insignia', 2021),
  ('Maserati', 'Ghibli', 2019),
  ('Bentley', 'Flying Spur', 2022);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "car"`);
  }
}
