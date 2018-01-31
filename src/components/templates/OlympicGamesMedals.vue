<template>
  <svg id="svg" v-if="isLoaded" x="0px" y="0px" :width="totalWidth" :height="totalHeight" xml:space="preserve">
    <defs>
      <symbol id="logo">
        <path class="light-blue" d="M23.338,0c-0.1,0-0.2,0-0.3,0h-1.9l-1.1,1.4v1.5h-3.1V1.4h1.8l1.1-1.4h-4.6v2.9h-1.5V0h-2.6l-2,2.9h-1.6l-1,1.4h1.6L6.939,6h1.9l1.1-1.7h2V6h1.7V4.3h1.5V6h1.7V4.3h3.1V6h1.7V4.3h1.3c1.5,0,2.3-0.7,2.3-2.2C25.438,0.8,24.539,0.1,23.338,0z M11.039,2.9l1-1.6v1.6H11.039z M23.338,2.8c-0.2,0.1-0.6,0.1-0.9,0.1h-0.6V1.3h0.6c0.3,0,0.7,0,0.9,0.1c0.2,0.1,0.4,0.3,0.4,0.7C23.639,2.5,23.539,2.7,23.338,2.8z"></path>
        <path class="copyright" d="M2.555,6.372C2.218,6.374,1.884,6.309,1.572,6.18C0.947,5.925,0.451,5.427,0.2,4.8C0.061,4.45-0.007,4.076,0,3.7c-0.007-0.372,0.061-0.742,0.2-1.088c0.252-0.623,0.747-1.116,1.372-1.364c0.629-0.251,1.331-0.251,1.96,0c0.624,0.249,1.12,0.741,1.372,1.364c0.138,0.346,0.206,0.716,0.2,1.088c0.007,0.376-0.061,0.75-0.2,1.1C4.777,5.114,4.587,5.4,4.347,5.64C3.87,6.111,3.226,6.374,2.555,6.372z M2.555,6.124c0.298,0.001,0.594-0.059,0.868-0.176c0.271-0.115,0.517-0.282,0.724-0.492c0.215-0.219,0.385-0.479,0.5-0.764C4.774,4.377,4.837,4.04,4.832,3.7c0.004-0.336-0.059-0.669-0.185-0.98c-0.115-0.284-0.285-0.542-0.5-0.76C3.941,1.751,3.695,1.585,3.423,1.472c-0.559-0.229-1.185-0.229-1.744,0C1.408,1.585,1.162,1.751,0.955,1.96c-0.215,0.218-0.385,0.476-0.5,0.76C0.33,3.031,0.267,3.364,0.271,3.7C0.267,4.04,0.33,4.377,0.455,4.692c0.115,0.285,0.285,0.545,0.5,0.764c0.207,0.21,0.453,0.377,0.724,0.492C1.956,6.066,2.255,6.125,2.555,6.124L2.555,6.124z M2.596,5.284C2.41,5.285,2.226,5.249,2.055,5.176C1.888,5.104,1.737,4.998,1.612,4.864c-0.132-0.145-0.234-0.315-0.3-0.5C1.233,4.152,1.194,3.927,1.195,3.7C1.193,3.486,1.233,3.274,1.315,3.076c0.073-0.177,0.181-0.337,0.316-0.472c0.13-0.13,0.285-0.232,0.456-0.3c0.175-0.068,0.361-0.102,0.548-0.1c0.189-0.006,0.376,0.037,0.544,0.124C3.331,2.413,3.471,2.52,3.595,2.644L3.411,2.852c-0.107-0.106-0.23-0.195-0.364-0.264C2.915,2.527,2.771,2.497,2.627,2.5C2.33,2.49,2.044,2.61,1.843,2.828C1.634,3.069,1.526,3.381,1.543,3.7c-0.02,0.34,0.084,0.675,0.292,0.944C2.028,4.873,2.315,5,2.615,4.988c0.178,0.003,0.353-0.037,0.512-0.116C3.274,4.795,3.411,4.7,3.535,4.588l0.159,0.224C3.551,4.939,3.396,5.05,3.23,5.144c-0.196,0.1-0.414,0.148-0.634,0.139V5.284z"></path>
      </symbol>

      <symbol id="logojo" viewBox="0 0 43.84 23.68" preserveAspectRatio="xMidYMid meet">
        <path class="cls-1" d="M31.79,10.11c2-1.88,3.39-3.21,3.39-4.32a1,1,0,0,0-1.1-1.18,2,2,0,0,0-1.39.8l-1-1a3.3,3.3,0,0,1,2.61-1.24A2.39,2.39,0,0,1,36.9,5.68c0,1.31-1.23,2.71-2.49,4a12.11,12.11,0,0,1,1.3-.1h1.57v1.52H31.79Z"></path>
        <path class="cls-2" d="M38.27,7.22c0-2.65,1.12-4,2.79-4s2.79,1.36,2.79,4-1.12,4.07-2.79,4.07S38.27,9.87,38.27,7.22Zm3.86,0c0-2.14-.47-2.61-1.08-2.61S40,5.08,40,7.22s.48,2.67,1.08,2.67S42.14,9.34,42.14,7.22Z"></path>
        <path class="cls-3" d="M31.85,18.77h1.69v-4.5H32.09V13.15A5.42,5.42,0,0,0,34,12.44h1.33v6.33h1.46v1.46h-5Z"></path>
        <path class="cls-4" d="M42.45,14.31a1.79,1.79,0,0,0-1.21-.55c-.86,0-1.55.61-1.61,2.43a2.19,2.19,0,0,1,1.56-.82,2.16,2.16,0,0,1,2.32,2.4,2.51,2.51,0,0,1-2.59,2.61c-1.51,0-2.94-1.13-2.94-3.86,0-2.91,1.51-4.22,3.15-4.22a3.1,3.1,0,0,1,2.27.93Zm-.59,3.46c0-.82-.43-1.13-1-1.13a1.41,1.41,0,0,0-1.18.77c.16,1.23.67,1.62,1.21,1.62S41.87,18.65,41.87,17.77Z"></path>
        <path class="cls-3" d="M5.43,19,3.51,15.43H2.28V19H0V9H3.61c2.12,0,3.87.74,3.87,3.12A3,3,0,0,1,5.7,15L8,19ZM2.28,13.63H3.43c1.18,0,1.83-.51,1.83-1.49s-.65-1.32-1.83-1.32H2.28Z"></path>
        <path class="cls-3" d="M17.5,14c0-3.27,1.86-5.15,4.55-5.15S26.6,10.72,26.6,14,24.75,19.22,22,19.22,17.5,17.26,17.5,14Zm6.78,0c0-2-.86-3.2-2.23-3.2S19.82,12,19.82,14s.88,3.29,2.23,3.29S24.28,16,24.28,14Z"></path>
        <polygon class="cls-3" points="9.4 14.21 9.4 23.68 15.61 23.68 15.61 17.97 9.4 14.21"></polygon>
        <path class="cls-3" d="M22.48,3.1l-.63.63h-8.1V1.24a1.24,1.24,0,0,0-2.47,0v2.5H3.16L2.53,3.1H.66v.63l2.5.63L3.8,6.24H5l4,1.16L8.77,10.6l.63.63v2.29l6.24,3.74V15l.63-.63-.39-6.92L20,6.24h1.24l.63-1.87,2.5-.63V3.1Z"></path>
      </symbol>

      <symbol id="gold" viewBox="0 0 13.16 21.93" preserveAspectRatio="xMidYMid meet" class="medal">
        <line y1="0.09" x2="13.16" y2="0.09" class="cls-1"></line>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-2"></circle>
        <path d="M9.26,11.59,9.14,9.48H3.63l-.14,2.13a5.58,5.58,0,1,0,5.77,0Z" class="cls-3"></path>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-4"></circle>
        <polyline points="2.59 0.09 4.74 9.01 4.74 11.05 8.04 11.05 8.04 9.01 6.22 0.09 2.55 0.09" class="cls-5"></polyline>
        <polyline points="10.18 0.09 8.03 9.01 8.03 11.05 4.73 11.05 4.73 9.01 6.55 0.09 10.21 0.09" class="cls-6"></polyline>
        <circle cx="6.4" cy="16.35" r="3.22" class="cls-3"></circle>
      </symbol>

      <symbol id="silver" viewBox="0 0 13.16 21.93" preserveAspectRatio="xMidYMid meet" class="medal">
        <line y1="0.09" x2="13.16" y2="0.09" class="cls-1"></line>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-2"></circle>
        <path d="M9.26,11.59,9.14,9.48H3.63l-.14,2.13a5.58,5.58,0,1,0,5.77,0Z" class="cls-3"></path>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-4"></circle>
        <polyline points="2.59 0.09 4.74 9.01 4.74 11.05 8.04 11.05 8.04 9.01 6.22 0.09 2.55 0.09" class="cls-5"></polyline>
        <polyline points="10.18 0.09 8.03 9.01 8.03 11.05 4.73 11.05 4.73 9.01 6.55 0.09 10.21 0.09" class="cls-6"></polyline>
        <circle cx="6.4" cy="16.35" r="3.22" class="cls-3"></circle>
      </symbol>

      <symbol id="bronze" viewBox="0 0 13.16 21.93" preserveAspectRatio="xMidYMid meet" class="medal">
        <line y1="0.09" x2="13.16" y2="0.09" class="cls-1"></line>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-2"></circle>
        <path d="M9.26,11.59,9.14,9.48H3.63l-.14,2.13a5.58,5.58,0,1,0,5.77,0Z" class="cls-3"></path>
        <circle cx="6.4" cy="16.35" r="3.93" class="cls-4"></circle>
        <polyline points="2.59 0.09 4.74 9.01 4.74 11.05 8.04 11.05 8.04 9.01 6.22 0.09 2.55 0.09" class="cls-5"></polyline>
        <polyline points="10.18 0.09 8.03 9.01 8.03 11.05 4.73 11.05 4.73 9.01 6.55 0.09 10.21 0.09" class="cls-6"></polyline>
        <circle cx="6.4" cy="16.35" r="3.22" class="cls-3"></circle>
      </symbol>

      <symbol id="pointer" viewBox="0 0 2.5 1.25" preserveAspectRatio="xMidYMid meet">
        <polygon points="0 0 1.25 1.25 2.5 0 0 0"></polygon>
      </symbol>
    </defs>

    <g id="background">
      <rect x="0" y="0" :width="totalWidth" :height="totalHeight" class="background"></rect>
    </g>
    <g id="header">
      <rect x="0" y="0" :width="totalWidth" height="1.984" class="green"></rect>
      <text :x="margin" y="13" class="surtitle">{{ trad('Jeux Olympiques de Rio') | uppercase }}</text>
      <text :x="margin" y="26" class="title">{{ trad('Médailles') }}</text>

      <g>
        <use xlink:href="#logojo" :x="totalWidth - margin - 43.84" y="7" width="43.3" height="23.6"></use>
      </g>

      <text :x="margin" :y="headerStart + 5" class="headranking">{{ trad('Classement') | uppercase }}</text>
      <text :x="margin + fullColumn" :y="headerStart + 5" class="headranking end">{{ trad('Total') | uppercase }}</text>

      <g class="medals">
        <text class="headranking gold middle" :x="margin + column * 5 - column / 2 + offset - 1.5" :y="headerStart - 8">{{ trad('Or') | uppercase }}</text>
        <text class="headranking silver middle" :x="margin + column * 6 - column / 2 + offset - 1.5" :y="headerStart - 8">{{ trad('Ar.') | uppercase }}</text>
        <text class="headranking bronze middle" :x="margin + column * 7 - column / 2 + offset - 1.5" :y="headerStart - 8">{{ trad('Br.') | uppercase }}</text>

        <g>
          <use xlink:href="#gold" :x="margin + column * 5 - column / 2 - offset - 2.5" :y="headerStart - 4" width="12" height="16"></use>
        </g>

        <g>
          <use xlink:href="#silver" :x="margin + column * 6 - column / 2 - offset - 2.5" :y="headerStart - 4" width="12" height="16"></use>
        </g>

        <g>
          <use xlink:href="#bronze" :x="margin + column * 7 - column / 2 - offset - 2.5" :y="headerStart - 4" width="12" height="16"></use>
        </g>
      </g>

      <g>
        <use xlink:href="#pointer" :x="margin + column / 3 - 1.25" :y="headerStart + 8" width="5" height="2.5"></use>
      </g>
      <g>
        <use xlink:href="#pointer" :x="totalWidth - margin - column / 2 - offset" :y="headerStart + 8" width="5" height="2.5"></use>
      </g>
    </g>
    <g id="ranking">
      <g id="country" v-for="(country, index) in ranking">
        <rect v-if="index < 10 && index % 2 == 0" :x="margin" :y="(index * heightLine + tableStart) - heightLine + 3.5" :width="fullColumn" :height="heightLine" :class="index%2 == 0 ? 'pair' : 'impair'"></rect>
        <rect v-else :x="margin" :y="(index * heightLine + tableStart) - heightLine + 3.5" :width="fullColumn" :height="heightLine" :class="index%2 == 0 ? 'pair' : 'impair'" class="light"></rect>

        <text :x="margin + column / 3" :y="index * heightLine + tableStart" class="semibold medium middle rank">{{ country.Pos }}</text>
        
        <text v-if="index < 3" :x="margin + column * 0.85" :y="index * heightLine + tableStart" class="semibold medium name">{{ trad(country.TeamNom) }}</text>
        <text v-else :x="margin + column * 0.85" :y="index * heightLine + tableStart" class="regular medium name">{{ trad(country.TeamNom) }}</text>

        <text :x="margin + column * 5 - offset" :y="index * heightLine + tableStart" class="bold medium end color">{{ country.Gold }}</text>
        <text :x="margin + column * 6 - offset" :y="index * heightLine + tableStart" class="regular small end">{{ country.Silver }}</text>
        <text :x="margin + column * 7 - offset" :y="index * heightLine + tableStart" class="regular small end">{{ country.Bronze }}</text>
        <text :x="margin + column * 8 - offset" :y="index * heightLine + tableStart" class="regular small end">{{ country.Total }}</text>
        <rect :x="margin + column * 7.12 - offset" :y="(index * heightLine + tableStart) - heightLine + 3.5" width="1" :height="heightLine" class="whiter"></rect>
      </g>
    </g>

    <g id="footer">
      <text :x="margin" :y="totalHeight - 6" class="source italic">{{ trad('Source') }}: AFP</text>
      <g i="logoafp">
        <use xlink:href="#logo" :x="totalWidth - margin - 25.448" :y="totalHeight - 12" width="25.448" height="6.342"></use>
      </g>
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
      const result = this.trads.find(d => d.word === word)
      if (result && result[this.lang]) return result[this.lang]
      console.log(`Warning : Unable to translate ${word} in ${this.lang}`)
      return word
    }
  }
}
</script>

<style lang="scss" scoped>
#logojo .cls-1 {
  fill:#43afd4;
}

#logojo .cls-2 {
  fill:#fbb957;
}

#logojo .cls-3 {
  fill:#46a660;
}

#logojo .cls-4 {
  fill:#de5a47;
}

.medal .cls-1, .medal .cls-2 {
  fill:none;
}

.medal .cls-1 {
  stroke:#de5a47;
  stroke-miterlimit:3.86;
  stroke-width:0.17px;
}

.medal .cls-4 {
  fill:#fff;
}

.medal .cls-3 {
  fill:grey;
}

.medal .cls-5 {
  fill:#de5a47;
}

.medal .cls-6 {
  fill:#e88b73;
}

#gold.medal .cls-3 {
  fill: #ffdd5c;
}
#silver.medal .cls-3 {
  fill: grey;
}
#bronze.medal .cls-3 {
  fill: #e6a375;
}

.color{
  fill : #de5a47;
}

.black{
  fill:#000;
}

.white {
  fill:#FFF;
}

.light-blue {
  fill:#46a3c9;
}

.background{
  fill:#FFFFFF;
}
.margin {
  fill:#FFFFFF;
}

.start {
  text-anchor: start;
}
.end {
  text-anchor: end;
}
.middle {
  text-anchor: middle;
}
.bold {
  font-family: 'SourceSansPro-Bold';
}
.semibold {
  font-family: 'SourceSansPro-Semibold';
}
.italic {
  font-family: 'SourceSansPro-It';
}
.regular {
  font-family: 'SourceSansPro-Regular';
}

.surtitle {
  font-family: 'SourceSansPro-Regular';
  font-size: 6.5px;
}

.source{
  font-size: 6px;
}

.title {
  font-family: 'SourceSansPro-Bold';
  font-size: 14px;
}

.small{
  font-size: 6.85px;
}
.medium{
  font-size: 7.3px;
}
.green{
  fill: #4ba660;
}

.headranking {
  font-size: 5px;
  letter-spacing: 0.05em;
  font-family: 'SourceSansPro-Regular';
}

.pair{
  fill: #dbe3e7;
}

.impair{
  fill: none;
}

.light{
  fill-opacity:0.4;
}
</style>