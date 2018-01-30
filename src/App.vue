<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <moulinex></moulinex>
  </div>
</template>

<script>
import Moulinex from './components/Moulinex'

export default {
  name: 'app',
  components: {
    Moulinex
  }
}
</script>

<style lang="scss">
$assets_path: '~@afp/toolkit-styles/assets/';
@import "~@afp/toolkit-styles/scss/main.scss";
</style>
