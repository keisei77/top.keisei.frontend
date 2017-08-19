<template>
  <div class="home">
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  data () {
    return {
      isShowLoading: true
    }
  },
  mounted () {
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
@import 'home'
</style>
