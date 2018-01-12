<template>
  <div>
    <div id="url">
      <input v-model="url">
    </div>
    <div id="opts">
      <label for="fake-test"><input type="checkbox" v-model="fakeText" id="fake-test"> Fake Text</label>
      <label for="border"><input type="checkbox" v-model="border" id="border"> Border</label>
    </div>
    <dimensions-selector v-on:newDimensions="setNewDimensions" />
    <visualizer :dimensions="dimensions" :url="url" :border="border" :fakeText="fakeText" />
    <div id="favorite-link">
      Shortcut (add this link to your favorites) : <a :href="etBym">Et Bym !</a>
    </div>
  </div>
</template>

<script>
import Visualizer from './Visualizer'
import DimensionsSelector from './DimensionsSelector'
import { parse } from 'url'

export default {
  name: 'Tester',

  components: { DimensionsSelector, Visualizer },

  data () {
    return {
      url: '',
      dimensions: 600,
      fakeText: false,
      border: false,
      toolUrl: ''
    }
  },

  computed: {
    etBym () {
      return `javascript: var url = window.location.href;var pymTester = "${this.toolUrl}?url=";window.open(pymTester+url);`
    }
  },

  mounted () {
    const url = parse(location.href, true)
    this.toolUrl = url.protocol + url.host + url.pathname
    this.url = url.query.url + (url.hash || '') || 'https://graphics.afpforum.com/builds/20171027-ecarts_temperature/#fr'
  },

  methods: {
    setNewDimensions (newDimensions) {
      this.dimensions = newDimensions
    }
  }
}
</script>

<style lang="scss" scoped>
  $form-width: 600px;
  $margin-bottom: 32px;

  #url, #favorite-link, #opts, #dimensions {
    max-width: $form-width;
    margin: auto;
    display: flex;
    margin-top: $margin-bottom;
    margin-bottom: $margin-bottom;
  }

  #favorite-link {
    justify-content: center;
    a {
      font-weight: bold;
    }
  }

  #url {
    justify-content: center;
    align-items: center;

    input {
      width: 90%;
      height: 55px;
    }
  }

  #opts {
    justify-content: space-around;
  }

  #dimensions {
    justify-content: space-around;
  }
</style>
