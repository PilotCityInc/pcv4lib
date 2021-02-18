<script lang="ts">
  import { defineComponent, onMounted } from '@vue/composition-api'
  import createLoader from '../boilerplate/loading'
  export default defineComponent({
    props: {
      callback: {
        type: Function,
        required: true,
      },
      processNow: {
        default: false,
      },
    },
    setup (props, ctx) {
      const { process, ...rest } = createLoader(props.callback)
      onMounted(() => {
        if (props.processNow) {
          process()
        }
      })
      return () => ctx.root.$scopedSlots?.default!({
        process,
        ...rest,
      })
    },
  })
</script>
