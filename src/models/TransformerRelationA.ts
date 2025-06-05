import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm'
import { TransformerRelationB } from './TransformerRelationB'

@Entity()
export class TransformerRelationA {
  @PrimaryGeneratedColumn()
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
      to: (value: number) => value,
      from: (value: number) => value,
    },
  })
  fieldATransformer!: number

  @Column({
    name: 'transformer_relation_b_id',
    type: 'int',
    transformer: {
      to: (value: number) => value,
      from: (value: number) => value,
    },
  })
  relationBId!: number

  @OneToOne(() => TransformerRelationB, { eager: true })
  @JoinColumn({ name: 'transformer_relation_b_id' })
  relationB!: TransformerRelationB
}
