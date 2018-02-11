<template>
  <div id="afpdeck">
    <side-bar @addColumn="addColumn" :autoRefresh.sync="autoRefresh"></side-bar>
    <div id="columns">
      <column
        v-for="(column, i) in columns"
        :key="i"
        :documents="column.documents"
        :documentsCount="column.documentsCount"
        :processing="column.processing"
        @close="closeColumn(i)"
        @refresh="refreshColumn(i)"
        @reset="resetColumn(i)"
        @loadMore="loadMoreDocuments(i)"
        :params.sync="column.params"
        :name.sync="column.name"
        :paramsOpen.sync="column.paramsOpen">
      </column>
    </div>
    <modal v-if="currentDocument" @close="currentDocument = null">
      <h3 slot="header">{{ currentDocument.title }}</h3>
      <article slot="body">
        <p v-for="p in currentDocument.body" v-html="p" v-linkified></p>
      </article>
      <p slot="footer">{{ currentDocument.footer }}</p>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '@/utils/bus'
import AfpNews from '@/utils/AfpNews'
import SideBar from '@/components/SideBar'
import Column from '@/components/Column'
import Modal from '@/components/Modal'
import VueLinkify from 'vue-linkify'

Vue.directive('linkified', VueLinkify)

const afpNews = new AfpNews({
  apiKey: ''
})

const defaultParams = {
  lang: null,
  urgency: null,
  searchTerms: null,
  size: 10,
  dateFrom: 'now-1h'
}

export default {
  name: 'afp-deck',
  components: { SideBar, Column, Modal },
  data () {
    return {
      columns: [],
      currentDocument: null,
      autoRefreshTimer: null,
      autoRefresh: false,
      autoRefreshDelay: 5000
    }
  },
  created () {
    afpNews.authenticate({
      username: '',
      password: ''
    }).then(() => {
      this.addColumn(undefined, undefined, false)
    })

    bus.$on('setCurrentDocument', data => {
      this.currentDocument = data
    })
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
    addColumn (name = 'Default', params = Object.assign({}, defaultParams), paramsOpen = true) {
      this.columns.push({
        name,
        params,
        documents: [],
        documentsCount: 0,
        processing: false,
        paramsOpen
      })
    },
    closeColumn (index) {
      this.columns.splice(index, 1)
    },
    async refreshColumn (indexCol, columnParams) {
      let params = columnParams || this.columns[indexCol].params

      this.columns[indexCol].processing = true

      try {
        const { documents, count } = await afpNews.search(params)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@afp/toolkit-styles/scss/variables.scss";
#afpdeck {
  height: 100vh;
  max-height: 100vh;
  display: flex;

  #columns {
    background-color: #E1E8ED;
    flex: 1;
    display: flex;
    overflow-x: scroll;
    height: 100%;
  }
}
</style>
