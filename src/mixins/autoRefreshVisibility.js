import { mapActions } from 'vuex'

export default {
  name: 'AutoRefreshVisibility',
  data () {
    return {
      lastIdleCallbackId: null
    }
  },
  mounted () {
    document.addEventListener('visibilitychange', this.visibilityChanged, false)
  },
  beforeDestroy () {
    document.removeEventListener('visibilitychange', this.visibilityChanged, false)
  },
  methods: {
    ...mapActions([
      'refreshAllColumns'
    ]),
    visibilityChanged () {
      cancelIdleCallback(this.lastIdleCallbackId)
      if (document.hidden === true || navigator.onLine === false) return
      this.lastIdleCallBackId = requestIdleCallback(() => {
        this.refreshAllColumns()
      })
    }
  }
}
