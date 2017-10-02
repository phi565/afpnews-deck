import { COUNT } from '../config/getters'
import { INCREMENT } from '../config/mutations'

// If I need to have more nested modules
const modules = {
}

// Basic state
const state = () => ({
  count: 0
})

// Getters with constant as a name
const getters = {
  [COUNT]: state => state.count
}

// If I need actions
const actions = {
}

// Basic mutation with constant as a name
const mutations = {
  [INCREMENT] (state, payload) {
    const { term } = payload
    state.count += term
  }
}

export default {
  namespaced: true, // don't forget to add this options
  modules,
  state,
  getters,
  mutations,
  actions
}
