import AfpNews from 'afpnews-api'
import store from '@/store'

const afpNews = new AfpNews({
  customAuthUrl: `${window.location.protocol}//${window.location.host}/auth`,
  saveToken: token => {
    if (token) {
      store.commit('setToken', token)
    }
  }
})

export default afpNews
