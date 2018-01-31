<template>
  <svg v-if="isLoaded" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :width="totalWidth" :height="totalHeight" xml:space="preserve">
    <g id="background">
      <rect x="0" y="0" :width="totalWidth" :height="totalHeight" class="background"></rect>
    </g>
    <g id="header">
      <rect x="0" y="0" :width="totalWidth" height="1.984" class="green"></rect>
      <text :x="margin" y="13" class="surtitle">{{ trad('Jeux Olympiques de Rio') | uppercase }}</text>
      <text :x="margin" y="26" class="title">{{ trad('Médailles') }}</text>
    </g>
  </svg>
</template>

<script>

export default {
  name: 'olympic-games-medals',
  props: ['event', 'lang'],
  data () {
    return {
      isLoaded: false,
      ranking: [],
      trads: [],
      totalWidth: 127.56,
      margin: 5.985,
      marginBottom: 6,
      heightLine: 12,
      tableStart: 72,
      headerStart: 48
    }
  },
  computed: {
    langBds () {
      const tableLang = {
        'fr': 1,
        'en': 2,
        'es': 3,
        'de': 1,
        'ar': 1,
        'pt': 1
      }
      return tableLang[this.lang]
    },
    totalHeight () {
      return this.ranking.length * this.heightLine + this.tableStart + this.marginBottom
    },
    fullColumn () {
      return this.totalWidth - this.margin * 2
    },
    column () {
      return this.fullColumn / 8
    },
    offset () {
      return this.column / 6
    }
  },
  created () {
    Promise.all([
      this.fetchData(`http://sbds:80/bdsapi/api/osmedalstanding/${this.langBds}/${this.event}`),
      this.fetchData('https://s3.eu-central-1.amazonaws.com/afp-interactive-datasets/footix-replace/trads.json')
    ])
      .then(results => {
        this.ranking = results[0].Classement
        this.trads = results[1]
      })
      .then(() => {
        this.isLoaded = true
      })
  },
  watch: {
    isLoaded (val) {
      this.$emit('loaded', val)
    }
  },
  filters: {
    uppercase (value) {
      if (!value) return
      return value.toUpperCase()
    }
  },
  methods: {
    async fetchData (url) {
      const response = await fetch(url)
      const data = await response.json()
      this.data = data
      return data
    },
    trad (word) {
      if (this.trads.length === 0) return ''
      return this.trads.find(d => d.word === word)[this.lang]
    }
  }
}
</script>

<style lang="scss" scoped>
  .background{
    fill:#FFFFFF;
  }
  .surtitle {
    font-family: 'SourceSansPro-Regular';
    font-size: 6.5px;
  }
  .title {
    font-family: 'SourceSansPro-Bold';
    font-size: 14px;
  }
</style>