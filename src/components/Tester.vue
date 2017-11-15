<template>
  <div>
    <input v-model="url">
    <input type="checkbox" v-model="fakeText"> Fake Text
    <input type="checkbox" v-model="border"> Border
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
    this.url = urlParameter[2]
  },

  methods: {
    setNewDimensions (newDimensions) {
      this.dimensions = newDimensions
    }
  }
}
</script>

<style scoped>

</style>
