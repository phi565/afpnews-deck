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
  </div>
</template>

<script>
import Visualizer from './Visualizer'
import DimensionsSelector from './DimensionsSelector'

export default {
  name: 'Tester',

  components: { DimensionsSelector, Visualizer },

  data () {
    return {
      url: 'https://graphics.afpforum.com/builds/20171027-ecarts_temperature/#fr',
      dimensions: 600,
      fakeText: false,
      border: false
    }
  },

  mounted () {
    const href = location.href
    const urlRegex = /(\?|&)url=([a-z0-9/_:.#-]*)/i
    const urlParameter = urlRegex.exec(href)
    if (urlParameter) this.url = urlParameter[2]
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

  #url, #opts, #dimensions {
    max-width: $form-width;
    margin: auto;
    display: flex;
    margin-top: $margin-bottom;
    margin-bottom: $margin-bottom;
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
