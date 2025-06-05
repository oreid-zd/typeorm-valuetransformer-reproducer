import { AppDataSource } from '../models/AppDataSource'
import { TransformerRelationA } from '../models/TransformerRelationA'

export default AppDataSource.getRepository(TransformerRelationA)
