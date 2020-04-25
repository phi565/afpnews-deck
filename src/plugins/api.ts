import AfpNews from 'afpnews-api'
import store from '@/store'

const afpNews = new AfpNews({
  customAuthUrl: 'https://u4z1csch7d.execute-api.eu-central-1.amazonaws.com/afpdeck',
  saveToken: token => {
    if (token) {
      store.commit('setToken', token)
    }
  }
})

export default afpNews
