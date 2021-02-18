import { reactive, toRefs, computed, ref } from "@vue/composition-api";

interface Props {
  value: {
    data: Record<string, any>; // Gives access to Document
    update: () => Promise<any>; // Gives access to update Method
    changeStream: any; // Gives access to mongodb Collection Changestream
  };
}

const getMongoDoc = (
  props: Props,
  ctx,
  defaultDataProperties?: Record<string, any>
) => {
  const programDoc = computed({
    get: () => props.value,
    set: (newVal) => {
      ctx.emit("input", newVal);
    },
  });

  programDoc.value = {
    ...programDoc.value,
    data: {
      defaultDataProperties,
      ...programDoc.value.data,
    },
  };

  // Save Program Doc Function
  const status = ref("");
  const saveData = reactive({
    saveLoading: false,
  });
  async function saveProgram() {
    saveData.saveLoading = true;
    try {
      await programDoc.value.update();
      status.value = "Saved Successfully";
    } catch (err) {
      console.log(err);
      status.value = `${"Something went wrong, try again later\n"}${err}`;
    }
    saveData.saveLoading = false;
  }

  return {
    programDoc,
    saveProgram,
    status,
    ...toRefs(saveData),
  };
};
export default getMongoDoc;
