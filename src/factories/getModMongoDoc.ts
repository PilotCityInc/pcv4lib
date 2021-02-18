import { MongoDoc } from '../types'
import { computed, SetupContext, Ref } from '@vue/composition-api'
/**
 * ! Only For use in vue components
 * Adds new data to existing Mongo Document
 * @param {Ref<MongoDoc>} programDocProp
 * @param {SetupContext['emit']} emit
 * @param {Record<string, any>} [defaultDataProperties]
 * @return {*}
 */
const getModMongoDoc = (
  programDocProp: Ref<MongoDoc>,
  emit: SetupContext['emit'],
  defaultDataProperties?: Record<string, any>,
) => {
  const programDoc = computed({
    get: () => programDocProp.value,
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
