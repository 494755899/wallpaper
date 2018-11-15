import Vue from 'vue'
import Vuex from 'vuex'
import geos from './modules/geos'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      geos
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geos/getPosition')
        commit('geos/setPosition', { city, province })
      }
    }
  })

export default store
