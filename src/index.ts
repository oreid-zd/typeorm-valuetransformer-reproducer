import { assert } from 'console'
import { AppDataSource } from './models/AppDataSource'
import NoRelationARepository from './repositories/NoRelationARepository'
import RelationARepository from './repositories/RelationARepository'
import RelationBRepository from './repositories/RelationBRepository'
import TransformerRelationBRepository from './repositories/TransformerRelationBRepository'
import TransformerRelationARepository from './repositories/TransformerRelationARepository'
import NoRelationBRepository from './repositories/NoRelationBRepository'
import BinaryRelationBRepository from './repositories/BinaryRelationBRepository'
import BinaryRelationARepository from './repositories/BinaryRelationARepository'
import { exit } from 'process'

const clearTables = async () => {
  await NoRelationARepository.delete({})
  await NoRelationBRepository.delete({})
  await RelationARepository.delete({})
  await RelationBRepository.delete({})
  await TransformerRelationARepository.delete({})
  await TransformerRelationBRepository.delete({})
  await BinaryRelationARepository.delete({})
  await BinaryRelationBRepository.delete({})
}

let lastId = 100
const allocateId = () => {
  lastId += 100
  return lastId
}

const performNoRelationLogic = async () => {
  const noRelationA = await NoRelationARepository.save(
    NoRelationARepository.create({
      fieldA: 1,
      fieldATransformer: 2,
    }),
  )
  assert(noRelationA.id, 'noRelationA instance should have an id')
  assert(noRelationA.fieldA === 1, 'noRelationA fieldA should be 1')
  assert(noRelationA.fieldATransformer === 2, 'noRelationA fieldATransformer should be 2')
}

const performRelationLogic = async () => {
  const relationBId1 = allocateId()
  await RelationBRepository.save(
    RelationBRepository.create({
      id: relationBId1,
      fieldB: 1,
      fieldBTransformer: 2,
    }),
  )
  const relationB = await RelationBRepository.findOneByOrFail({ id: relationBId1 })

  const relationBId2 = allocateId()
  await RelationBRepository.save(
    RelationBRepository.create({
      id: relationBId2,
      fieldB: 1,
      fieldBTransformer: 2,
    }),
  )
  const relationB2 = await RelationBRepository.findOneByOrFail({ id: relationBId2 })

  const relationAId = allocateId()
  await RelationARepository.save(
    RelationARepository.create({
      id: relationAId,
      fieldA: 1,
      fieldATransformer: 2,
      relationBId: relationB.id,
    }),
  )
  const relationA = await RelationARepository.findOneByOrFail({ id: relationAId })
  assert(relationA.id, 'relationA instance should have an id')
  assert(relationA.fieldA === 1, 'relationA fieldA should be 1')
  assert(relationA.fieldATransformer === 2, 'relationA fieldATransformer should be 2')
  assert(relationA.relationBId === relationB.id, 'relationA should have a relationBId')
  assert(relationA.relationB.id === relationB.id, 'relationA relationB id should equal relationB id')

  await RelationARepository.update({ id: relationAId }, { relationBId: relationBId2 })
  const updatedRelationA = await RelationARepository.findOneByOrFail({ id: relationAId })
  assert(updatedRelationA.relationBId === relationB2.id, 'updatedRelationA should have updated relationB2.id')
  assert(
    updatedRelationA.relationB.id === relationB2.id,
    'updatedRelationA relationB id should have updated relationB2.id',
  )
}

const performTransformerRelationLogic = async () => {
  const transformerRelationBId1 = allocateId()
  await TransformerRelationBRepository.save(
    TransformerRelationBRepository.create({
      id: transformerRelationBId1,
      fieldB: 1,
      fieldBTransformer: 2,
    }),
  )
  const transformerRelationB1 = await TransformerRelationBRepository.findOneByOrFail({ id: transformerRelationBId1 })

  const transformerRelationBId2 = allocateId()
  await TransformerRelationBRepository.save(
    TransformerRelationBRepository.create({
      id: transformerRelationBId2,
      fieldB: 1,
      fieldBTransformer: 2,
    }),
  )
  const transformerRelationB2 = await TransformerRelationBRepository.findOneByOrFail({ id: transformerRelationBId2 })

  const transformerRelationAId = allocateId()
  await TransformerRelationARepository.save(
    TransformerRelationARepository.create({
      id: transformerRelationAId,
      fieldA: 1,
      fieldATransformer: 2,
      relationBId: transformerRelationB1.id,
    }),
  )
  const transformerRelationA = await TransformerRelationARepository.findOneByOrFail({ id: transformerRelationAId })
  assert(transformerRelationA.id, 'transformerRelationA instance should have an id')
  assert(transformerRelationA.fieldA === 1, 'transformerRelationA fieldA should be 1')
  assert(transformerRelationA.fieldATransformer === 2, 'transformerRelationA fieldATransformer should be 2')
  assert(
    transformerRelationA.relationBId === transformerRelationB1.id &&
      transformerRelationA.relationB.id === transformerRelationB1.id,
    'transformerRelationA should have a relationBId',
  )

  await TransformerRelationARepository.update({ id: transformerRelationAId }, { relationBId: transformerRelationBId2 })
  const updatedTransformerRelationA = await TransformerRelationARepository.findOneByOrFail({
    id: transformerRelationAId,
  })
  assert(
    updatedTransformerRelationA.relationBId === transformerRelationBId2 &&
      updatedTransformerRelationA.relationB.id === transformerRelationB2.id,
    'updatedTransformerRelationA should have updated transformerRelationId2',
  )
}

const performBinaryRelationLogic = async () => {
  const binaryRelationBId1 = allocateId()
  await BinaryRelationBRepository.save(
    BinaryRelationBRepository.create({
      id: binaryRelationBId1,
      fieldB: 1,
      fieldBBinary: 2,
    }),
  )
  const binaryRelationB1 = await BinaryRelationBRepository.findOneByOrFail({ id: binaryRelationBId1 })

  const binaryRelationAId = allocateId()
  await BinaryRelationARepository.save(
    BinaryRelationARepository.create({
      id: binaryRelationAId,
      fieldA: 1,
      fieldATransformer: 2,
    }),
  )
  const binaryRelationA = await BinaryRelationARepository.findOneByOrFail({ id: binaryRelationAId })
  assert(binaryRelationA.id, 'binaryRelationA instance should have an id')
  assert(binaryRelationA.fieldA === 1, 'binaryRelationA fieldA should be 1')
  assert(
    binaryRelationA.relationB === null && binaryRelationA.relationBId === null,
    'binaryRelationA should not have a relationBId initially',
  )

  await BinaryRelationARepository.update({ id: binaryRelationAId }, { relationBId: binaryRelationBId1 })
  const updatedBinaryRelationA = await BinaryRelationARepository.findOneByOrFail({
    id: binaryRelationAId,
  })
  assert(
    updatedBinaryRelationA.relationBId === binaryRelationBId1 &&
      updatedBinaryRelationA.relationB?.id === binaryRelationB1.id,
    'updatedBinaryRelationA should have updated binaryRelationId1',
  )
}

const main = async () => {
  await AppDataSource.initialize()
  await clearTables()

  console.log('\n\n\nPerforming no relation logic...')
  await performNoRelationLogic()
  console.log('\n\n\nPerforming relation logic...')
  await performRelationLogic()
  console.log('\n\n\nPerforming transformer relation logic...')
  await performTransformerRelationLogic()
  console.log('\n\n\nPerforming binary relation logic...')
  await performBinaryRelationLogic()

  exit(0)
}

main()
