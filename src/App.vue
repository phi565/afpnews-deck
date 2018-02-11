<!-- Main App file, needed only for dev -->
<template>
  <div id="app">
    <afp-deck></afp-deck>
  </div>
</template>

<script>
import AfpDeck from './components/AfpDeck'

export default {
  name: 'app',
  components: {
    AfpDeck
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
$assets_path: '~@afp/toolkit-styles/assets/';
@import "~@afp/toolkit-styles/scss/main.scss";
</style>
