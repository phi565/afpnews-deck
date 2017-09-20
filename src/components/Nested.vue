<!-- Exemple of a nested component -->
<template>
  <div class="nested">
    <button type="button" @click="increment({term: 1})">Increment</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { NAMESPACE } from '@/config'
import { INCREMENT } from '@/config/mutations'

export default {
  name: 'Nested',

  methods: {
    ...mapMutations(NAMESPACE, {
      increment: INCREMENT
    })
  }
}
</script>

<style lang="css">
</style>
