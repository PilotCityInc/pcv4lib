<script lang="ts">
  import { defineComponent, onMounted } from '@vue/composition-api'
  import createLoader from '../boilerplate/loading'
  export default defineComponent({
    props: {
      callback: {
        type: Function,
        required: true,
      },
      linearLoader: {
        type: Boolean,
      },
      processNow: {
        default: false,
      },
    },
    setup (props, ctx) {
      const { loading, process } = createLoader(props.callback)
      onMounted(() => {
        if (props.processNow) {
          process()
        }
      })
      //   return {
      //     loading,
      //     process,
      //   }
      return () => ctx.root.$scopedSlots?.default!({
        loading,
        process,
      })
    },
  })
</script>
