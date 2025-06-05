import { AppDataSource } from '../models/AppDataSource'
import { NoRelationB } from '../models/NoRelationB'

export default AppDataSource.getRepository(NoRelationB)
