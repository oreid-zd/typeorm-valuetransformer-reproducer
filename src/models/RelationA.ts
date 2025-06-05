import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm'
import { RelationB } from './RelationB'

@Entity()
export class RelationA {
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
      to: (value: number) => value + 1,
      from: (value: number) => value - 1,
    },
  })
  fieldATransformer!: number

  @Column({ name: 'relation_b_id', type: 'int' })
  relationBId!: number

  @OneToOne(() => RelationB, { eager: true })
  @JoinColumn({ name: 'relation_b_id' })
  relationB!: RelationB
}
