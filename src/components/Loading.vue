<template>
  <div class="loading">
    <div class="letters">
      <span class="letter" v-for="(letter, index) in letters" :key="index">{{ letter }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      letters: 'KeiSei'.split('')
    }
  }
}
</script>


<style lang="stylus">
@import '../styles/mixin'

.loading
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  .letters
    display flex
    width 100%
    height 100%
    align-items center
    justify-content center
    .letter
      padding 0 0.15rem
      $font-size(16px)
      font-weight 700
</style>
