<template>
  <button
    class="add-column"
    @click="search">
    <i class="UI-icon UI-plus" /> {{ $t('deck.add-column') }}
  </button>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AddColumn',

  methods: {
    ...mapMutations([
      'addColumn'
    ]),

    search () {
      if (this.$route.name !== 'deck') this.$router.push({ name: 'deck' })
      this.addColumn()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/colors.scss";
  @import "@/assets/scss/variables.scss";

  .add-column {
    display: inline-flex;
    align-items: center;
    align-content: center;

    margin: 4px 16px 0 12px;
    padding: 0 20px;

    width: 281px;
    height: 48px;

    border: none;
    border-radius: 4px;

    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;

    font-size: 0.9rem;
    text-align: left;
    color: white;

    overflow: hidden;
    outline: none;

    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);
    }

    i.UI-icon.UI-plus {
      font-size: 1.2rem;
      position: relative;
      top: -1px;
      margin-right: 3px;
    }
  }
</style>
