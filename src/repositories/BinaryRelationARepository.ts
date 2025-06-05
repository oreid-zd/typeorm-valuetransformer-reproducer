import { AppDataSource } from '../models/AppDataSource'
import { BinaryRelationA } from '../models/BinaryRelationA'

export default AppDataSource.getRepository(BinaryRelationA)
