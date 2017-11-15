<template lang="html">
  <div class="dimensions">
    <button 
      type="button" 
      :class="{active: d.value === currentDimensions}" 
      v-for="d in availableDimensions" 
      @click.prevent="currentDimensions = d.value" :disabled="!d.available">
        {{ d.value }}
    </button>
    <button 
      type="button" 
      :class="{active: currentDimensions === '100%'}" 
      @click.prevent="currentDimensions = '100%'">
      100%
    </button>
    <label for="">
      <input 
        name="manual" 
        type="text" 
        v-model.number.lazy="currentDimensions">
        px
    </label>
  </div>
</template>

<script>

export default {
  name: 'DimensionsSelector',
  data () {
    return {
      dimensions: [300, 500, 600],
      clientWidth: 600,
      currentDimensions: 600
    }
  },
  computed: {
    availableDimensions () {
      return this.dimensions
        .map(dim => {
          return {
            value: dim,
            available: dim <= this.clientWidth
          }
        })
    }
  },
  watch: {
    clientWidth (clientWidth) {
      const availableDimensions = this.availableDimensions
        .filter(dim => dim.available)
        .map(dim => dim.value)
      const newDimension = Math.max(...availableDimensions)
      this.currentDimension = newDimension >= 500 ? newDimension : '100%'
    },
    currentDimensions (newDimensions) {
      this.$emit('newDimensions', newDimensions)
    }
  },
  mounted () {
    this.setSize()
    window.onresize = this.setSize
  },
  methods: {
    setSize () {
      this.clientWidth = this.$el.clientWidth
    }
  }
}
</script>

<style lang="css" scoped>
</style>
