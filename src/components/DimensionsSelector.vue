<template lang="html">
  <div id="dimensions">
    <button 
      type="button" 
      :class="{active: d.value === current && unit === 'px'}" 
      v-for="d in existingDimensions" 
      @click.prevent="setPixelSize(d.value)" v-if="d.available">
        {{ d.value }}
    </button>
    <button 
      type="button" 
      :class="{active: current === 100 && unit === '%'}" 
      @click.prevent="setPercentageSize(100)">
      Auto
    </button>
    <label for="">
      <input 
        name="manual" 
        type="number" 
        v-model.number.lazy="current">
        <select name="unit" v-model="unit">
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
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
      current: 600,
      unit: 'px'
    }
  },
  computed: {
    existingDimensions () {
      return this.dimensions
        .map(dim => {
          return {
            value: dim,
            available: dim <= this.clientWidth
          }
        })
    },
    availableDimensions () {
      return this.existingDimensions
        .filter(dim => dim.available)
    },

    currentDimensions () {
      return this.current + this.unit
    }
  },
  watch: {
    clientWidth (clientWidth) {
      const availableDimensions = this.availableDimensions
        .filter(dim => dim.available)
        .map(dim => dim.value)
      const newDimensions = Math.max(...availableDimensions)
      if (newDimensions >= 500) {
        this.setPixelSize(newDimensions)
      } else {
        this.setPercentageSize(100)
      }
    },
    currentDimensions (newDimensions) {
      this.$emit('newDimensions', newDimensions)
    }
  },
  mounted () {
    this.setSize()
    window.onresize = this.setSize
    this.$emit('newDimensions', this.currentDimensions)
  },
  methods: {
    setSize () {
      this.clientWidth = this.$el.clientWidth
    },
    setPixelSize (value) {
      this.current = value
      this.unit = 'px'
    },
    setPercentageSize (value) {
      this.current = value
      this.unit = '%'
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    max-width: 100px;
  }
</style>
