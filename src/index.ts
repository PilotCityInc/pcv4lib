import { VueConstructor } from 'vue'
import YourComponent from './YourComponent'
// import * as components from './components'
import * as factories from './factories'
import * as renderless from './renderless'
const YourPluginName = {
  install (Vue: VueConstructor, options?: any) {
    Vue.component('your-component', YourComponent)
    // Object.entries(components).forEach(([componentName, component]) => {
    //   Vue.component(componentName, component)
    // })
  },
}
export { YourComponent, factories, renderless }
export default YourPluginName

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(YourPluginName)
}
