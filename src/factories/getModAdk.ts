import { computed, SetupContext } from '@vue/composition-api'
import getModMongoDoc from './getModMongoDoc'
/**
 * ! Only for use in vue components
 * ! PropName must correspond to a MongoDoc
 * Adds new data for Adks array in existing mongo document
 * Will create ADK using defaultADKProperties if it doesnt exist
 * @param {{ [x: string]: any}} props
 * @param {SetupContext['emit']} emit
 * @param {string} adkName
 * @param {Record<string, any>} [defaultADKProperties]
 * @param {string} [propName='value']
 * @param {('Program' | 'Student' | 'Team')} [collection='Program']
 * @return {*}
 */
const getModAdk = (
  props: { [x: string]: any},
  emit: SetupContext['emit'],
  adkName: string,
  defaultADKProperties?: Record<string, any>,
  propName = 'value',
  collection: 'Program' | 'Student' | 'Team' = 'Program',
) => {
  const { programDoc } = getModMongoDoc(props, emit, defaultADKProperties, propName)

  let adkIndex = (programDoc.value.data.adks as any[]).findIndex(
    (obj: Record<string, any>) => {
      return obj.name === adkName
    },
  )

  if (adkIndex === -1) { adkIndex = programDoc.value.data.adks.push({ name: adkName }) - 1 }

  if (defaultADKProperties !== undefined) {
    programDoc.value.data.adks[adkIndex] = {
      ...defaultADKProperties,
      ...programDoc.value.data.adks[adkIndex],
    }
  }

  // ! Use this to handle when doc logic diverges
  switch (collection) {
    case 'Program':
      break
    case 'Student':
      break
    case 'Team':
      break
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
