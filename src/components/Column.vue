<template>
  <section class="column">
  	<header>
      <h1 contenteditable @blur="updateName" @keypress.enter="cancelNewLines">{{ name }}</h1>
      <button :class="{ processing, danger: error }" @click="refresh"><i class="UI-icon UI-refresh"></i></button>
      <button @click="$emit('update:paramsOpen', !paramsOpen)" :class="{ success: paramsOpen }"><i class="UI-icon UI-settings"></i></button>
    </header>
    <form
      @submit.stop.prevent=""
      @keydown.enter.stop.prevent="refresh"
      v-if="paramsOpen"
    >
      <div class="actions">
        <button @click="$emit('move', 'left')"><i class="UI-icon UI-slide-left"></i></button>
        <button @click="$emit('move', 'right')"><i class="UI-icon UI-slide-right"></i></button>
        <button @click="$emit('close')" class="danger"><i class="UI-icon UI-close-alt"></i></button>
      </div>
      <select name="lang" v-model="lang">
        <option disabled selected>Choose a lang</option>
        <option v-for="lang in languages" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
      </select>
      <select name="urgency" v-model="urgency">
        <option disabled selected>Choose an urgency</option>
        <option v-for="urgency in urgencies" :key="urgency.value" :value="urgency.value">{{ urgency.label }}</option>
      </select>
      <input class="search" type="text" name="search" v-model="searchTerms" placeholder="Search..." autofocus>
    </form>
    <main>
      <document class="list-complete-item" v-for="(doc, i) in documents" :key="doc.uno" :doc="doc"></document>
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" key="infiniteLoading">
        <div slot="no-results">
          <h2 class="error">No news.</h2>
          Try to expand the date range.
        </div>
        <div slot="no-more">
          <h2 class="error">No more news.</h2>
          Try to expand the date range.
        </div>
      </infinite-loading>
    </main>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Document from '@/components/Document'

export default {
  name: 'column',
  components: { Document, InfiniteLoading },
  props: {
    name: {
      type: String,
      required: true
    },
    documents: {
      type: Array,
      required: true
    },
    documentsCount: {
      type: Number,
      required: true
    },
    params: {
      type: Object,
      required: true
    },
    processing: {
      type: Boolean,
      required: true
    },
    error: {
      type: Boolean,
      required: true
    },
    paramsOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      languages: [
        {
          label: 'All languages',
          value: null
        },
        {
          label: 'English',
          value: 'en'
        },
        {
          label: 'French',
          value: 'fr'
        },
        {
          label: 'German',
          value: 'de'
        },
        {
          label: 'Spanish',
          value: 'es'
        },
        {
          label: 'Portuguese',
          value: 'pt'
        },
        {
          label: 'Arabic',
          value: 'ar'
        }
      ],
      urgencies: [
        {
          label: 'All urgencies',
          value: null
        },
        {
          label: 'Flashs',
          value: 1
        },
        {
          label: 'Alertes',
          value: 2
        },
        {
          label: 'Urgents',
          value: 3
        },
        {
          label: 'Dépêches',
          value: 4
        },
        {
          label: 'Autres',
          value: 5
        }
      ],
      dateRanges: [
        {
          label: '1 hour',
          value: 'now-1h'
        },
        {
          label: '1 day',
          value: 'now-1d'
        },
        {
          label: '1 month',
          value: 'now-1M'
        },
        {
          label: '1 year',
          value: 'now-12M'
        },
        {
          label: 'Since 2012',
          value: '2012-01-01'
        }
      ]
    }
  },
  computed: {
    lang: {
      get () {
        return this.params.lang
      },
      set (lang) {
        this.updateParams({ lang }, true, true)
      }
    },
    urgency: {
      get () {
        return this.params.urgency
      },
      set (urgency) {
        this.updateParams({ urgency }, true, true)
      }
    },
    dateFrom: {
      get () {
        return this.params.dateFrom
      },
      set (dateFrom) {
        const oldDateFromIndex = this.dateRanges.findIndex(d => d.value === this.params.dateFrom)
        const newDateFromIndex = this.dateRanges.findIndex(d => d.value === dateFrom)
        this.updateParams({ dateFrom }, oldDateFromIndex > newDateFromIndex, true)
      }
    },
    searchTerms: {
      get () {
        return this.params.searchTerms
      },
      set (searchTerms) {
        this.updateParams({ searchTerms })
      }
    }
  },
  watch: {
    processing (newVal, oldVal) {
      if (newVal === false) {
        if (this.documents.length === this.documentsCount || this.documents.length === 0) {
          this.$refs.infiniteLoading.stateChanger.complete()
        } else {
          this.$refs.infiniteLoading.stateChanger.loaded()
        }
      }
    }
  },
  created () {
    if (!this.paramsOpen) this.$emit('refresh')
  },
  methods: {
    cancelNewLines (ev) {
      if (ev.which === 13) {
        ev.preventDefault()
      }
    },
    updateName (ev) {
      const newName = ev.target.textContent.replace(/\n/g, '').substr(0, 20)
      this.$emit('update:name', newName)
    },
    updateParams (newParams, reset = true, refresh = false) {
      const params = Object.assign(this.params, newParams)
      if (this.documents.length > 0) {
        if (reset === true) {
          this.$emit('reset')
        }
        if (refresh === true) {
          this.refresh()
        }
      }
      this.$emit('update:params', params)
    },
    refresh () {
      this.$refs.infiniteLoading.stateChanger.reset()
      this.$emit('refresh')
    },
    infiniteHandler ($state) {
      if (this.processing) return false
      if (this.documentsCount > this.documents.length) {
        this.$emit('loadMore')
        return
      }
      $state.complete()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@afp/toolkit-styles/scss/variables.scss";

.column {
  background-color: white;
  min-width: 310px;
  max-width: 310px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;

  header {
    background-color: #F5F8FA;
    min-height: 50px;
    max-height: 50px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 12px;

    h1 {
      flex: 1;
      font-size: 1.3rem;
      outline: none;
    }

    button {
      margin-left: 5px;
    }
  }

  form {
    display: flex;
    flex-wrap: wrap;
    min-height: 130px;
    .actions {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 4px;
      button {
        margin-left: 4px;
      }
    }
    .search {
      width: 100%;
    }
    select {
      width: 50%;
    }
  }

  h2.error {
    text-align: center;
    padding: 5px;
  }

  main {
    overflow-y: scroll;
    overscroll-behavior: contain;
  }
}
</style>
