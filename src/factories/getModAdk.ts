import { computed, SetupContext } from '@vue/composition-api'
import getModMongoDoc from './getModMongoDoc'

/**
 * ! Only for use in vue components
 * ! PropName must correspond to a MongoDoc
 * Adds new data for Adks array in existing mongo document
 * Will create ADK using defaultADKProperties if it doesn't exist
 * @param {{ [x: string]: any }} props
 * @param {SetupContext['emit']} emit
 * @param {string} adkName
 * @param {Record<string, any>} [defaultADKProperties]
 * @param {string} [propName='value']
 * @param {string} [emitEvent='input']
 * @return {*}
 */

const getModAdk = (
  props: { [x: string]: any },
  emit: SetupContext['emit'],
  adkName: string,
  defaultADKProperties?: Record<string, any>,
  propName = 'value',
  emitEvent = 'input',
) => {
  const programDoc = getModMongoDoc(props, emit, {}, propName, emitEvent)

  let adkIndex = (programDoc.value.data.adks as any[]).findIndex(
    (obj: Record<string, any>) => {
      if (obj) {
        return obj.name === adkName;
      }
      return false;
    },
  )

  if (adkIndex === -1) {
    adkIndex = programDoc.value.data.adks.push({ name: adkName }) - 1
  }

  if (defaultADKProperties !== undefined) {
    programDoc.value.data.adks[adkIndex] = {
      ...defaultADKProperties,
      ...programDoc.value.data.adks[adkIndex],
    }
  }

  const adkData = computed({
    get: () => programDoc.value.data.adks[adkIndex],
    set: newVal => {
      programDoc.value.data.adks[adkIndex] = newVal
    },
  })

  return {
    adkData,
    adkIndex,
  }
}
export default getModAdk
