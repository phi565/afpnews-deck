import AfpNews from 'afpnews-api'
import store from '@/store'

class AfpNewsAuth extends AfpNews {
  constructor (...params) { // eslint-disable-line no-useless-constructor
    super(...params)
  }

  get client () {
    return this._client
  }

  set client (client) {
    this._client = client
  }

  get authUrl () {
    if (this.client === 'afpdeck') {
      return `/auth`
    } else {
      return super.authUrl
    }
  }

  get apiKey () {
    return this._apiKey
  }

  set apiKey ({ client, clientId, clientSecret }) {
    if (client && client !== 'other') {
      this._apiKey = 'unset'
      this.client = client
    } else if (clientId && clientSecret) {
      super.apiKey = { clientId, clientSecret }
      delete this._client
    } else {
      delete this._client
      delete this._apiKey
    }
  }

  get authorizationBasicHeaders () {
    if (this.client) {
      return {}
    }
    return super.authorizationBasicHeaders
  }

  saveToken (token) {
    store.commit('setToken', token)
  }
}

export default new AfpNewsAuth()
