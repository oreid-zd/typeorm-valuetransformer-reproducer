import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn, ManyToOne } from 'typeorm'
import { BinaryRelationB } from './BinaryRelationB'
import { BinaryTransformer } from './transformers/BinaryTransformer'

@Entity()
export class BinaryRelationA {
  @PrimaryColumn({
    name: 'id',
    type: 'binary',
    length: 8,
    transformer: new BinaryTransformer(),
  })
  id!: number

  @Column({
    name: 'field_a',
    type: 'int',
  })
  fieldA!: number

  @Column({
    name: 'field_a_transformer',
    type: 'int',
    transformer: {
      to: (value: number) => value + 1,
      from: (value: number) => value - 1,
    },
  })
  fieldATransformer!: number

  @Column({
    name: 'binary_relation_b_id',
    type: 'binary',
    length: 8,
    nullable: true,
    transformer: new BinaryTransformer(),
  })
  relationBId!: number | null

  @ManyToOne(() => BinaryRelationB, { eager: true })
  @JoinColumn({ name: 'binary_relation_b_id', foreignKeyConstraintName: 'FK_a_to_b' })
  relationB!: BinaryRelationB | null
}
