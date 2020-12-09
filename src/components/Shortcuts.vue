<template>
  <div class="shortcuts">
    <div class="shortcuts-start">
      <p>{{ $t("shortcuts.change-contents") }}</p>
      <select v-model="lang">
        <option
          disabled
          selected
        >
          {{ $t("shortcuts.select-language") }}
        </option>
        <option
          v-for="language in languages"
          :key="language"
          :value="language"
        >
          {{ $t(`languages.${language}`) }}
        </option>
      </select>
    </div>
    <div class="shortcuts-end">
      <a
        class="reset"
        @click="resetAllColumns()"
      >
        {{ $t("shortcuts.reset-contents") }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Shortcuts',
  computed: {
    ...mapState([
      'defaultLang'
    ]),
    lang: {
      get () {
        return this.defaultLang
      },
      set (val) {
        this.changeAllContentLanguage(val)
      }
    },
    languages() {
      return ['en', 'fr', 'de', 'es', 'pt', 'ar', 'zh-tw', 'zh-cn']
    }
  },
  methods: {
    ...mapActions([
      'changeAllContentLanguage'
    ]),
    ...mapMutations([
      'resetAllColumns'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.shortcuts {
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0 2.5rem;
  .shortcuts-start {
    justify-content: flex-start;
    display: flex;

    select {
      transform: translateY(-3px);
      background: transparent;
      border: none;
      color: $secondary-color;
      outline: none;
      margin-left: 10px;
    }

    @media screen and (max-width: 600px) {
      font-size: 13px;
      font-weight: 600 !important;

      select {
        transform: translateY(0px);
      }
    }
  }
  .shortcuts-end {
    margin-left: auto;
    justify-content: flex-end;
    display: flex;

    .reset {
      color: $dark;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }

    @media screen and (max-width: 800px) {
      display: none !important;
    }
  }
}
</style>