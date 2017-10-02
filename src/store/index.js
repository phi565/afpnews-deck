import Vue from 'vue'
import Vuex from 'vuex'
import Watermark from './watermark'
import { NAMESPACE } from '../config'

Vue.use(Vuex)

// Simpliest store with a namespaced module
export default new Vuex.Store({
  modules: {
    [NAMESPACE]: Watermark
  }
})
