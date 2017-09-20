<!-- Main component file, the one that will be exported -->
<template>
  <div class="external">
    <img :src="require('@/assets/logo.png')">
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <nested/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NAMESPACE } from '@/config'
import { COUNT } from '@/config/getters'

import Nested from './Nested'

export default {
  name: 'External',

  components: { Nested },

  data () {
    return {
      msg: 'Welcome to your Vue.js external component'
    }
  },

  computed: {
    ...mapGetters(NAMESPACE, {
      count: COUNT
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
