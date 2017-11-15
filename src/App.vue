<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <tester></tester>
  </div>
</template>

<script>
import Tester from './components/Tester'

export default {
  name: 'app',
  components: {
    Tester
  }
}
</script>

<style>
#app {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
