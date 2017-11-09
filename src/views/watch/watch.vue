<template>
  <div class="watch-wrapper">
    <div class="mickey-watch">
      <div class="digit" v-for="i in 12" :key="i">
        <span>{{ i }}</span>
      </div>
      <div id="mickey"></div>
      <div id="hours" :class="hourClass" :style="hourStyle"></div>
      <div id="minutes" :class="minutesClass" :style="minutesStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    }
  },
  mounted () {
    setInterval(() => {
      this.hours = new Date().getHours()
      this.minutes = new Date().getMinutes()
    }, 1000)
  },
  computed: {
    hourClass () {
      if (this.hours >= 6 && this.hours < 12) {
        return 'left'
      }
      return 'right'
    },
    hourStyle () {
      let deg = this.hours * 32
      if (deg < 180) {
        deg -= 5
      }
      return {
        transform: `rotate(${deg}deg)`
      }
    },
    minutesClass () {
      if (this.minutes < 30) {
        return 'back left'
      }
      return 'left'
    },
    minutesStyle () {
      let deg = this.minutes * 6
      if (deg < 180) {
        deg += 5
      } else {
        deg -= 5
      }
      return {
        transform: `rotate(${deg}deg)`
      }
    }
  }
}
</script>

<style lang="scss">
@import 'watch';
</style>
