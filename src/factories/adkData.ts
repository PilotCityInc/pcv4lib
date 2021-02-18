import { reactive, toRefs, computed, ref } from "@vue/composition-api";
import getMongoDoc from './mongoDoc'

interface Props {
  value: {
    data: Record<string, any>; // Gives access to Document
    update: () => Promise<any>; // Gives access to update Method
    changeStream: any; // Gives access to mongodb Collection Changestream
  };
}

const getADKData = (
  props: Props,
  ctx,
  adkName: string,
  defaultADKProperties?: Record<string, any>,
) => {
  const {programDoc, saveProgram, status, saveData} = getMongoDoc(props, ctx)

  let adkIndex = programDoc.value.data.adks.findIndex(
    (obj: Record<string, any>) => {
      return obj.name === adkName;
    }
  );

  if (adkIndex === -1)
      adkIndex = programDoc.value.data.adks.push({ name: adkName }) - 1;

  if (defaultADKProperties !== undefined) {
    programDoc.value.data.adks[adkIndex] = {
        ...defaultADKProperties,
        ...programDoc.value.data.adks[adkIndex],
      };
  }

  const adkData = computed({
    get: () => programDoc.value.data.adks[adkIndex],
    set: (newVal) => {
      programDoc.value.data.adks[adkIndex] = newVal;
      saveProgram();
    },
  });
    
  return {
    adkData,
    status,
    ...toRefs(saveData),
  };
};
export default getADKData;
