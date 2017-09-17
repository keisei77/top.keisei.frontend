import axios from 'axios'
import { isEmpty } from './utils'

function httpUtils (Vue) {
  Vue.mixin({
    methods: {
      $_get (url, params) {
      // $_get (url, query, params) {
        // if (!isEmpty(query)) {
        //   url = !~url.indexOf('?') ? `${url}?` : url
        //   for (let key in query) {
        //     url += `${key}=${query[key]}&`
        //   }
        //   url = url.slice(0, -1)
        //   return axios.get(url)
        // }
        if (!isEmpty(params)) {
          return axios.get(url, {
            params
          })
        }
        return axios.get(url)
      }
    }
  })
}

export {
  httpUtils
}
