import { AppDataSource } from '../models/AppDataSource'
import { BinaryRelationB } from '../models/BinaryRelationB'

export default AppDataSource.getRepository(BinaryRelationB)
