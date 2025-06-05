import { AppDataSource } from '../models/AppDataSource'
import { NoRelationA } from '../models/NoRelationA'

export default AppDataSource.getRepository(NoRelationA)
