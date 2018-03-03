<template>
  <div class="home">
    <loading :show="isShowLoading"></loading>
    <div id="map-container"></div>
    <div class="location-tip" v-show="false">
      <div class="tip" v-for="(item, index) in locationTip.split('\n')" :key="index">{{ item }}</div>
    </div>
    <div class="weather-tip" v-show="!isShowWeather">
      <img src="../../assets/weather.png" class="icon" v-tap.prevent="{ methods: showWeather }">
    </div>
    <div class="flipper-container" v-show="isShowWeather">
      <flipper
        :class="{ flip: isFlipped }"
        v-bind:style="{ height: flipHeight }"
        v-tap="{ methods: flip }">
        <div class="flipper-front" slot="flipper-front">
          <img src="../../assets/close.png" class="icon" v-tap.prevent="{ methods: close }">
          <div class="weather">
            <div class="instant">实时天气</div>
            <div class="item" v-for="(value, key) in currentWeather" :key="key">
              <span>{{ key | tipFormat }}</span>
              <span>
                {{ value | weatherFormat }}
                <span v-if="key === 'temperature'">℃</span>
                <span v-if="key === 'windPower'">级</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flipper-back" slot="flipper-back">
          <img src="../../assets/close.png" class="icon">
          <div class="forecast">
            <div class="instant">未来四天</div>
            <div class="item" v-for="(weather, index) in forecasts" :key="index">
              <span>{{ weather.date }}</span>
              <span>{{ weather.dayWeather }}</span>
              <span>{{ weather.nightTemp + '~' + weather.dayTemp }}℃</span>
            </div>
          </div>
        </div>
      </flipper>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Flipper from '@/components/Flipper'
// import Envconst from '../../utils/env'

// function getData (vm) {
//   return vm.$_get(`${Envconst.apiDomain}/api/v1/home`)
// }

function initMap (vm) {
  return new Promise((resolve, reject) => {
    let map, geolocation
    map = new window.AMap.Map('map-container', {
      pitch: 75,
      viewMode: '3D',
      zoom: 17,
      expandZoomRange: true,
      zooms: [3, 20],
      center: [116.333926, 39.997245]
    })

    map.plugin('AMap.Geolocation', () => {
      geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
        buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition()
      window.AMap.event.addListener(geolocation, 'complete', (data) => {
        let str = ['定位成功']
        str.push('经度：' + data.position.getLng())
        str.push('纬度：' + data.position.getLat())
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米')
        } // 如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
        vm.locationTip = str.join('\n')
        resolve(data)
      })// 返回定位信息
      window.AMap.event.addListener(geolocation, 'error', (data) => {
        reject(data)
      })
    })
  })
}

function getWeather (vm, adCode) {
  return new Promise((resolve, reject) => {
    window.AMap.service('AMap.Weather', function () {
      let weather = new window.AMap.Weather()
      // 查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
      resolve(Promise.all([
        new Promise((resolve, reject) => {
          weather.getLive(adCode, function (err, data) {
            if (err) reject(err)
            resolve(data)
          })
        }),
        new Promise((resolve, reject) => {
          weather.getForecast(adCode, function (err, data) {
            if (err) reject(err)
            resolve(data)
          })
        })
      ]))
    })
  })
}

function resetFlipHeight (vm, delay = 0) {
  setTimeout(() => {
    let fontSize = window.document.documentElement.style.fontSize
    let el = vm.isFlipped ? document.querySelector('.flipper .flipper-back') : document.querySelector('.flipper .flipper-front')
    if (el) {
      let style = window.getComputedStyle(el, false)
      vm.flipHeight = `${Number(style.height.slice(0, -2)) / Number(fontSize.slice(0, -2))}rem`
    }
  }, delay)
}

export default {
  data () {
    return {
      isShowLoading: true,
      locationTip: '',
      locationData: {},
      currentWeather: {},
      forecasts: [],
      isShowWeather: false,
      isFlipped: false,
      flipHeight: ''
    }
  },
  mounted () {
    initMap(this).then(data => {
      this.isShowLoading = false
      this.locationData = data
      getWeather(this, this.locationData.addressComponent.adcode).then(result => {
        this.isShowWeather = true
        this.currentWeather = result[0]
        delete this.currentWeather.adcode
        delete this.currentWeather.info
        this.forecasts = result[1].forecasts
        resetFlipHeight(this, 1000)
      })
    })
    // getData(this).then(data => {
    //   console.log(data)
    // })
  },
  methods: {
    flip () {
      this.isFlipped = !this.isFlipped
      resetFlipHeight(this)
    },
    close () {
      this.isShowWeather = false
    },
    showWeather () {
      this.isShowWeather = true
    }
  },
  filters: {
    tipFormat (key) {
      let tip
      switch (key) {
        case 'province':
          tip = `省份: `
          break
        case 'city':
          tip = `城市/区: `
          break
        case 'weather':
          tip = `天气: `
          break
        case 'temperature':
          tip = `温度: `
          break
        case 'windDirection':
          tip = `风向: `
          break
        case 'windPower':
          tip = `风力: `
          break
        case 'humidity':
          tip = `空气湿度: `
          break
        case 'reportTime':
          tip = `发布时间: `
          break
        default:
          tip = ''
      }

      return tip
    },
    weatherFormat (value) {
      return isNaN(value) && !value ? 2 : value
    }
  },
  components: {
    Loading,
    Flipper
  }
}
</script>

<style lang="stylus">
@import 'map'
</style>
