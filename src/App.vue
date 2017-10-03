<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <external></external>
  </div>
</template>

<script>
import External from './components/External'

export default {
  name: 'app',
  components: {
    External
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
