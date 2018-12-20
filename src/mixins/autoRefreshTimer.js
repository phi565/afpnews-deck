export default {
  name: 'AutoRefreshTimer',
  data () {
    return {
      autoRefreshTimer: null,
      autoRefreshDelay: 10000,
      lastIdleCallbackId: null
    }
  },
  mounted () {
    this.startAutoRefresh()
  },
  beforeDestroy () {
    this.stopAutoRefresh()
  },
  methods: {
    startAutoRefresh () {
      this.autoRefreshTimer = setInterval(() => {
        cancelIdleCallback(this.lastIdleCallbackId)
        if (document.hidden === true || navigator.onLine === false) return
        this.lastIdleCallbackId = requestIdleCallback(() => {
          this.refreshColumn({ indexCol: this.columnId, more: 'after' })
        })
      }, this.autoRefreshDelay)
    },
    stopAutoRefresh () {
      if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer)
    }
  }
}
