<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <uploader iptc-parser-url="http://localhost"></uploader>
  </div>
</template>

<script>
import Uploader from './components/Uploader'

export default {
  name: 'app',
  components: {
    Uploader
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
