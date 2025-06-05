import { AppDataSource } from '../models/AppDataSource'
import { RelationB } from '../models/RelationB'

export default AppDataSource.getRepository(RelationB)
