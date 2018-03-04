<template>
  <section class="column">
  	<header>
      <h1 contenteditable @blur="updateName" @keypress.enter="cancelNewLines">{{ name }}</h1>
      <button :class="{ processing }" @click="refresh"><i class="UI-icon UI-refresh"></i></button>
      <button @click="$emit('update:paramsOpen', !paramsOpen)" :class="{ success: paramsOpen }"><i class="UI-icon UI-settings-alt"></i></button>
      <button @click="$emit('close')"><i class="UI-icon UI-close-alt"></i></button>
    </header>
    <form @submit.prevent="refresh" @keyup.enter="refresh" v-if="paramsOpen">
      <select name="lang" v-model="lang">
        <option disabled selected>Choose a lang</option>
        <option v-for="lang in languages" :key="lang.value" :value="lang.value">{{ lang.label }}</option>
      </select>
      <select name="urgency" v-model="urgency">
        <option disabled selected>Choose an urgency</option>
        <option v-for="urgency in urgencies" :key="urgency.value" :value="urgency.value">{{ urgency.label }}</option>
      </select>
      <select name="dateFrom" v-model="dateFrom">
        <option disabled selected>Choose a date range</option>
        <option v-for="dateFrom in dateRanges" :key="dateFrom.value" :value="dateFrom.value">{{ dateFrom.label }}</option>
      </select>
      <input type="text" name="search" v-model="searchTerms" placeholder="Search..." autofocus>
    </form>
  	<!-- <transition-group
      name="list"
      tag="main"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    > -->
    <main>
      <document class="list-complete-item" v-for="(doc, i) in documents" :key="doc.uno" :doc="doc" :data-index="i"></document>
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
    <!-- </transition-group> -->
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
// import Velocity from 'velocity-animate'
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
          label: 'Since 1990',
          value: '1990-01-01'
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
        if (this.documentsCount === 0) {
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
    // ,
    // beforeEnter (el) {
    //   el.style.opacity = 0
    //   el.style.height = 0
    // },
    // enter (el, done) {
    //   const delay = el.dataset.index * 150
    //   setTimeout(() => {
    //     Velocity(
    //       el,
    //       { opacity: 1, height: 150, 'min-height': 150 },
    //       { complete: done }
    //     )
    //   }, delay)
    // },
    // leave (el, done) {
    //   const delay = el.dataset.index * 150
    //   setTimeout(() => {
    //     Velocity(
    //       el,
    //       { opacity: 0, height: 0, 'min-height': 0 },
    //       { complete: done }
    //     )
    //   }, delay)
    // }
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
    min-height: 100px;
    select, input {
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
