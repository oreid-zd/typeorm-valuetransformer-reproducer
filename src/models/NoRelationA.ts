import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class NoRelationA {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "field_a",
    type: "int",
  })
  fieldA!: number;

  @Column({
    name: "field_a_transformer",
    type: "int",
    transformer: {
      to: (value: number) => value + 1,
      from: (value: number) => value - 1,
    },
  })
  fieldATransformer!: number;
}
