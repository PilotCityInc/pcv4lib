import { reactive, toRefs, UnwrapRef } from '@vue/composition-api'
const createLoader = (func: () => Promise<any>, onSuccessMsg?: string, onErrorMsg?: string) => {
  const state: UnwrapRef<{
      loading: boolean
      message: string | null
      error: boolean
      success: boolean
  }> = reactive({
    loading: false,
    message: null,
    error: false,
    success: false,
  })
  const process = async () => {
    state.loading = true
    try {
      await func()
      state.error = false
      state.success = true
      state.message = onSuccessMsg || ''
    } catch (err) {
      state.message = onErrorMsg || err
      state.success = false
      state.error = true
    }
    state.loading = false
  }
  return {
    ...toRefs(state),
    process,
  }
}
export default createLoader
