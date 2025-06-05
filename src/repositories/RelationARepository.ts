import { AppDataSource } from '../models/AppDataSource'
import { RelationA } from '../models/RelationA'

export default AppDataSource.getRepository(RelationA)
