<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <afp-deck
      :columns="columns"
      @addColumn="addColumn"
      @moveColumn="moveColumn"
      @closeColumn="closeColumn"
      @refreshColumn="refreshColumn"
      @resetColumn="resetColumn"
      @loadMoreDocuments="loadMoreDocuments"
      :autoRefresh.sync="autoRefresh"
      @columnParamsChanged="columnsParamsChanged"
      @columnNameChanged="columnsNameChanged"
    ></afp-deck>
  </div>
</template>

<script>
import AfpNews from 'afpnews-api'
import AfpDeck from './components/AfpDeck'

const defaultSearchParams = {
  dateFrom: '2012-01-01',
  dateTo: 'now',
  urgency: null,
  lang: 'fr',
  size: 10,
  searchTerms: ''
}

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
      const clientId = localStorage.getItem('afpnews-clientid') || prompt('Please enter your client Id', null)
      localStorage.setItem('afpnews-clientid', clientId)
      const clientSecret = localStorage.getItem('afpnews-clientsecret') || prompt('Please enter your client Secret', null)
      localStorage.setItem('afpnews-clientsecret', clientSecret)

      this._afpNews = new AfpNews({ baseUrl: 'https://api.afpforum.com', clientId, clientSecret })

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
    async refreshColumn (indexCol, more) {
      let params = JSON.parse(JSON.stringify(this.columns[indexCol].params))

      if (more === 'before') {
        const lastDocument = this.columns[indexCol].documents.slice(-1).pop()
        if (lastDocument) {
          let lastDate = new Date(lastDocument.published)
          lastDate.setSeconds(lastDate.getSeconds() - 1)
          params = Object.assign(params, { dateTo: lastDate.toISOString(), dateFrom: '2012-01-01' })
        }
      } else if (more === 'after') {
        const firstDocument = this.columns[indexCol].documents[0]
        if (firstDocument) {
          let firstDate = new Date(firstDocument.published)
          firstDate.setSeconds(firstDate.getSeconds() + 1)
          params = Object.assign(params, { dateFrom: firstDate.toISOString(), dateTo: 'now' })
        }
      }

      this.columns[indexCol].processing = true

      try {
        const { documents, count } = await this._afpNews.search(params)
        localStorage.setItem('afpnews-token', JSON.stringify(this._afpNews.token))

        const existingDocuments = this.columns[indexCol].documents

        if (more === 'before') {
          this.columns[indexCol].documents = existingDocuments.concat(documents)
        } else if (more === 'after') {
          this.columns[indexCol].documents = documents.concat(existingDocuments)
        } else {
          this.columns[indexCol].documents = documents
          this.columns[indexCol].documentsCount = count
        }

        this.columns[indexCol].error = false
      } catch (e) {
        console.error(e)
        this.columns[indexCol].error = true
        this.columns[indexCol].documents = []
      }

      this.columns[indexCol].processing = false
    },
    addColumn (name = 'Default', params = {}, paramsOpen = true) {
      params = Object.assign(JSON.parse(JSON.stringify(defaultSearchParams)), params)

      this.columns.push({
        name,
        params,
        documents: [],
        documentsCount: 0,
        processing: false,
        error: false,
        paramsOpen
      })
      this.saveColumns()
    },
    moveColumn (indexCol, dir) {
      const to = dir === 'left' ? indexCol - 1 : indexCol + 1
      const element = this.columns[indexCol]
      this.columns.splice(indexCol, 1)
      this.columns.splice(to, 0, element)
      this.saveColumns()
    },
    closeColumn (index) {
      const confirmation = confirm('Do you really want to delete the column ?')
      if (!confirmation) return false
      this.columns.splice(index, 1)
      this.saveColumns()
    },
    async loadMoreDocuments (indexCol) {
      await this.refreshColumn(indexCol, 'before')
    },
    resetColumn (indexCol) {
      this.columns[indexCol].documents = []
      this.columns[indexCol].count = 0
    },
    startAutoRefresh () {
      this.autoRefreshTimer = setInterval(() => {
        Promise.all(
          this.columns
            .filter(column => !column.paramsOpen)
            .map((column, i) => this.refreshColumn(i, 'after'))
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
    columnsParamsChanged (indexCol) {
      // this.columns[indexCol].documents = []
      // this.columns[indexCol].count = 0
      this.saveColumns()
    },
    columnsNameChanged (indexCol) {
      this.saveColumns()
    },
    initColumns () {
      if (localStorage.getItem('afpnews-columns')) {
        const savedColumns = JSON.parse(localStorage.getItem('afpnews-columns'))
        savedColumns.forEach(({ name, params }) => {
          this.addColumn(name, params, false)
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
