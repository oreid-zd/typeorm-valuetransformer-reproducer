import { DataSource } from 'typeorm'
import { NoRelationA } from './NoRelationA'
import { NoRelationB } from './NoRelationB'
import { RelationA } from './RelationA'
import { RelationB } from './RelationB'
import { TransformerRelationA } from './TransformerRelationA'
import { TransformerRelationB } from './TransformerRelationB'
import { BinaryRelationA } from './BinaryRelationA'
import { BinaryRelationB } from './BinaryRelationB'

export const AppDataSource = new DataSource({
  type: 'mysql',
  connectorPackage: 'mysql2',
  host: 'localhost',
  port: 3317,
  username: 'admin',
  password: '123456',
  database: 'typeorm_reproducer',
  entities: [
    NoRelationA,
    NoRelationB,
    RelationA,
    RelationB,
    TransformerRelationA,
    TransformerRelationB,
    BinaryRelationA,
    BinaryRelationB,
  ],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../../migrations/*.ts'],
  charset: 'utf8mb4',
  logging: ['query'],
})
