<template>
  <div class="home">
    <loading :show="isShowLoading"></loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Envconst from '../../utils/env'

function getData (vm) {
  return vm.$_get(`${Envconst.apiDomain}/api/v1/home`)
}

export default {
  data () {
    return {
      isShowLoading: true
    }
  },
  mounted () {
    getData(this).then(data => {
      console.log(data)
      setTimeout(() => {
        this.isShowLoading = false
      }, 3000)
    })
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
@import 'home'
</style>
