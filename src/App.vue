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

<style lang="scss">
$assets_path: '~@afp/toolkit-styles/assets/';
@import "~@afp/toolkit-styles/scss/main.scss";
</style>
