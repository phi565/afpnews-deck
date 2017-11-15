<template>
  <div class="interactive-layout">
    <div v-show="fakeText">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis neque ex, eleifend non diam quis, lacinia dapibus odio. Donec tincidunt placerat libero, eget condimentum lectus viverra ut. Quisque vel quam bibendum, pretium ligula ac, feugiat dolor. Donec nunc urna, vehicula vel sapien vitae, eleifend fermentum enim. Morbi eu consectetur augue. Nam vitae faucibus nulla. Maecenas venenatis vehicula neque non convallis. Quisque ac est sit amet mauris venenatis porttitor eget quis nisl. Vivamus ultrices magna non leo iaculis pulvinar ac et ante. Etiam vitae nunc quis lorem posuere luctus. Mauris non nulla ac est efficitur venenatis a nec enim. Etiam sed quam in felis porttitor ullamcorper sit amet in urna.</p>
      <p>Suspendisse posuere, arcu aliquam tincidunt pharetra, turpis nibh eleifend erat, ac commodo sem odio eget nisi. Morbi nec turpis finibus justo sollicitudin semper. Suspendisse congue eu ex id vehicula. Morbi ut cursus ligula. Quisque vitae sagittis ligula, id luctus odio. Donec tempor felis sit amet nibh tincidunt consequat. Nam et libero efficitur, lobortis magna et, scelerisque mi. In augue dui, pulvinar vel libero id, ullamcorper ultricies dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent et odio ut enim efficitur consequat. Aliquam vitae congue massa. Fusce auctor viverra tempor.</p>
      <p>Maecenas vestibulum, orci ac mollis fermentum, sem orci pulvinar elit, sed consequat orci lorem ac nisl. Vestibulum orci odio, efficitur eu ligula at, pellentesque luctus urna. Praesent sit amet magna lobortis, ullamcorper nunc posuere, feugiat enim. Nulla pellentesque libero nulla, in rutrum velit varius ut. Curabitur enim ligula, sodales vel massa quis, feugiat fringilla sem. Nunc dignissim tempus tempus. Nullam faucibus tellus porta leo ullamcorper, sed gravida metus suscipit. Nullam mollis nisl eu massa pretium, ac accumsan dui accumsan. Nunc nec erat nec magna porttitor congue. Aliquam iaculis nec augue in laoreet. Nunc finibus iaculis turpis, at finibus purus mattis molestie. Fusce et ex vitae diam posuere euismod at non sem. Vestibulum nec lectus arcu. Curabitur scelerisque lectus neque, faucibus fermentum est molestie eu. Aenean tincidunt varius pretium. Fusce et dolor dapibus, euismod eros eget, finibus lorem.</p>
    </div>
    <div id="interactive" :style="{width: cssDimensions, border: border ? '1px solid black' : 'none'}"></div>
    <div v-show="fakeText">
      <p>Maecenas a ornare nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam viverra, purus vel posuere hendrerit, nisi nulla consequat libero, in vulputate lacus risus id diam. Nam quis justo ante. Sed viverra nulla ac facilisis ullamcorper. Quisque aliquam blandit elementum. Vestibulum sed ante tincidunt nisi porta blandit sed sed sem. Etiam finibus ex et augue sagittis, non hendrerit erat porttitor.</p>
      <p>Aenean pharetra dictum pulvinar. Etiam sit amet nulla quis arcu tristique volutpat sit amet sed elit. Integer blandit, est id volutpat condimentum, quam leo mollis turpis, ultrices viverra lorem massa sit amet neque. Suspendisse pretium quam non consequat finibus. Mauris ac iaculis mi. Nunc lobortis aliquam vestibulum. Duis id elementum quam. Mauris rutrum eleifend sapien, quis sollicitudin diam volutpat at. Sed orci ante, volutpat nec mi non, iaculis pharetra magna. Nulla facilisi.</p>
    </div>
  </div>
</template>

<script>
import pym from 'pym.js'

export default {
  name: 'Visualizer',

  props: ['url', 'dimensions', 'border', 'fakeText'],

  data () {
    return {
      _pym: null
    }
  },

  computed: {
    cssDimensions () {
      return this.dimensions.toString().search(/%/) === -1 ? this.dimensions + 'px' : this.dimensions
    }
  },

  watch: {
    url () {
      this.mountInteractive()
    }
  },

  mounted () {
    this.mountInteractive()
  },

  methods: {
    mountInteractive () {
      /* eslint-disable no-new */
      this._pym = new pym.Parent('interactive', this.url, {allowfullscreen: true})
    }
  }
}
</script>

<style scoped>
  .interactive-layout {
    background-color: #ccc;
  }
</style>
