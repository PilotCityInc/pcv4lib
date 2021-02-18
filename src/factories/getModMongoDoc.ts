import { MongoDoc } from './../types'
import { computed, SetupContext } from '@vue/composition-api'
/**
 * ! Only For use in vue components
 * ! PropName must correspond to a MongoDoc
 * Adds new data to existing Mongo Document
 * @param {Ref<MongoDoc>} programDocProp
 * @param {SetupContext['emit']} emit
 * @param {Record<string, any>} [defaultDataProperties]
 * @return {*}
 */
const getModMongoDoc = (
  props: { [x: string]: any},
  emit: SetupContext['emit'],
  defaultDataProperties?: Record<string, any>,
  propName = 'value',
) => {
  const programDoc = computed({
    get: () => props[propName] as MongoDoc,
    set: newVal => {
      emit('input', newVal)
    },
  })

  programDoc.value = {
    ...programDoc.value,
    data: {
      defaultDataProperties,
      ...programDoc.value.data,
    },
  }

  return {
    programDoc,
  }
}
export default getModMongoDoc
