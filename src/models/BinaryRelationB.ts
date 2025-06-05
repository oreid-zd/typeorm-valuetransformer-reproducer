import { Entity, Column, PrimaryColumn } from 'typeorm'
import { BinaryTransformer } from './transformers/BinaryTransformer'

@Entity()
export class BinaryRelationB {
  @PrimaryColumn({
    name: 'id',
    type: 'binary',
    length: 8,
    transformer: new BinaryTransformer(),
  })
  id!: number

  @Column({
    name: 'field_b',
    type: 'int',
  })
  fieldB!: number

  @Column({
    name: 'field_b_binary',
    type: 'int',
    transformer: {
      to: (value: number) => value + 1,
      from: (value: number) => value - 1,
    },
  })
  fieldBBinary!: number
}
