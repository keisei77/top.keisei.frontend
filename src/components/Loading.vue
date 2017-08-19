<template>
  <div class="loading" v-show="show">
    <div class="letters">
      <transition-group
        name="staggered-fade"
        tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <span
          class="letter"
          v-for="(letter, index) in letterArray"
          :data-index="index"
          :key="index">{{ letter }}</span>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      letters: ''
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.letters = 'KeiSei'
    }, 0)
  },
  watch: {
    letters (newValue, oldValue) {
    }
  },
  computed: {
    letterArray () {
      return this.letters
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0
    },
    enter (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        window.Velocity(
          el,
          { opacity: 1, color: '#aaffff' },
          { loop: true, delay: 500 },
          { complete: done }
        )
      }, delay)
    },
    leave (el, done) {
      let delay = el.dataset.index * 150
      setTimeout(function () {
        window.Velocity(
          el,
          { opacity: 0 },
          { complete: done }
        )
      }, delay)
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
      padding 0 0.1rem
      $font-size(16px)
      font-weight 700
</style>
