import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity()
export class TransformerRelationB {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'field_b',
    type: 'int',
  })
  fieldB!: number

  @Column({
    name: 'field_b_transformer',
    type: 'int',
    transformer: {
      to: (value: number) => value + 1,
      from: (value: number) => value - 1,
    },
  })
  fieldBTransformer!: number
}
