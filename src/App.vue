<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <afp-deck
      :columns="columns"
      @addColumn="addColumn"
      @closeColumn="closeColumn"
      @refreshColumn="refreshColumn"
      @resetColumn="resetColumn"
      @loadMoreDocuments="loadMoreDocuments"
      :autoRefresh.sync="autoRefresh"
      @columnParamsChanged="saveColumns"
    ></afp-deck>
  </div>
</template>

<script>
import AfpNews from 'afpnews-api/dist/afpnews.browser'
import AfpDeck from './components/AfpDeck'

export default {
  name: 'app',
  components: {
    AfpDeck
  },
  data () {
    return {
      _afpNews: null,
      columns: [],
      autoRefreshTimer: null,
      autoRefresh: false,
      autoRefreshDelay: 5000
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.stopAutoRefresh()
  },
  watch: {
    autoRefresh (newVal) {
      if (newVal) this.startAutoRefresh()
      else this.stopAutoRefresh()
    }
  },
  methods: {
    async init () {
      const apiKey = localStorage.getItem('afpnews-apikey') || prompt('Please enter your apiKey', null)
      localStorage.setItem('afpnews-apikey', apiKey)
      this._afpNews = new AfpNews({ apiKey })

      const token = localStorage.getItem('afpnews-token')

      if (token) {
        this._afpNews.token = JSON.parse(token)
      } else {
        const username = prompt('Please enter your username', null)
        const password = prompt('Please enter your password', null)
        await this._afpNews.authenticate({
          username,
          password
        })
      }
      localStorage.setItem('afpnews-token', JSON.stringify(this._afpNews.token))

      this.initColumns()
    },
    async refreshColumn (indexCol, columnParams) {
      let params = columnParams || this.columns[indexCol].params

      this.columns[indexCol].processing = true

      try {
        const { documents, count } = await this._afpNews.search(params)
        localStorage.setItem('afpnews-token', JSON.stringify(this._afpNews.token))
        const existingDocuments = this.columns[indexCol].documents
        const newDocuments = documents.filter(newDoc => {
          return existingDocuments.find(existingDoc => existingDoc.uno === newDoc.uno) === undefined
        })
        const mergeDocuments = existingDocuments.concat(newDocuments).sort((a, b) => {
          return new Date(b.published) - new Date(a.published)
        })
        this.columns[indexCol].documents = mergeDocuments
        this.columns[indexCol].documentsCount = count
      } catch (e) {
        console.error(e)
        this.columns[indexCol].documents = []
      }

      this.columns[indexCol].processing = false
    },
    addColumn (name = 'Default', params = Object.assign({}, this._afpNews.defaultSearchParams), paramsOpen = true) {
      this.columns.push({
        name,
        params,
        documents: [],
        documentsCount: 0,
        processing: false,
        paramsOpen
      })
      this.saveColumns()
    },
    closeColumn (index) {
      this.columns.splice(index, 1)
      this.saveColumns()
    },
    async loadMoreDocuments (indexCol) {
      await this.refreshColumn(indexCol)
      this.columns[indexCol].params.size = this.columns[indexCol].params.size + 20
    },
    resetColumn (indexCol) {
      this.columns[indexCol].params.size = 10
      this.columns[indexCol].documents = []
    },
    startAutoRefresh () {
      this.autoRefreshTimer = setInterval(() => {
        Promise.all(
          this.columns
            .filter(column => !column.paramsOpen)
            .map(column => {
              column.params.dateFrom = 'now-1h'
              column.params.size = 10
              return column
            })
            .map((column, i) => this.refreshColumn(i, column.params))
        )
      }, this.autoRefreshDelay)
    },
    stopAutoRefresh () {
      if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer)
    },
    saveColumns () {
      const savedColumns = this.columns.map(column => {
        return {
          params: column.params,
          name: column.name
        }
      })
      localStorage.setItem('afpnews-columns', JSON.stringify(savedColumns))
    },
    initColumns () {
      if (localStorage.getItem('afpnews-columns')) {
        const savedColumns = JSON.parse(localStorage.getItem('afpnews-columns'))
        savedColumns.forEach(column => {
          this.addColumn(column.name, column.params, false)
        })
      } else {
        this.addColumn(undefined, undefined, false)
      }
    }
  }
}
</script>

<style lang="scss">
$assets_path: '~@afp/toolkit-styles/assets/';
@import "~@afp/toolkit-styles/scss/main.scss";
</style>
