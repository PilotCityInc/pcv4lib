import { MongoDoc } from './../types'
import { computed, SetupContext } from '@vue/composition-api'

/**
 * ! Only For use in vue components
 * ! PropName must correspond to a MongoDoc
 * Adds new data to existing Mongo Document
 * @param {{ [x: string]: any}} props
 * @param {SetupContext['emit']} emit
 * @param {Record<string, any>} [defaultDataProperties]
 * @param {string} [propName='value']
 * @param {string} [emitEvent='input']
 * @return {*}
 */
const getModMongoDoc = (
  props: { [x: string]: any},
  emit: SetupContext['emit'],
  defaultDataProperties?: Record<string, any>,
  propName = 'value',
  emitEvent = 'input',
) => {
  const programDoc = computed({
    get: () => props[propName] as MongoDoc,
    set: newVal => {
      emit(emitEvent, newVal)
    },
  })

  programDoc.value = {
    ...programDoc.value,
    data: {
      defaultDataProperties,
      ...programDoc.value.data,
    },
  }

  return programDoc
}
export default getModMongoDoc
