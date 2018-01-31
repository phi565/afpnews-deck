<template>
  <div>
    <loading v-if="!isLoaded"></loading>
    <div>
      <olympic-games-medals v-if="spec.template === 'olympic-games-medals'" v-show="isLoaded" v-on:loaded="val => { this.isLoaded = true }" :event="spec.year" :lang="spec.lang" :key="`${spec.year}-${spec.lang}`"></olympic-games-medals>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import OlympicGamesMedals from '@/components/templates/OlympicGamesMedals'

export default {
  name: 'svg-composer',

  components: { Loading, OlympicGamesMedals },

  props: {
    spec: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoaded: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
