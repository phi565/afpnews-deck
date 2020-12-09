<template>
  <header class="search-params">
    <div class="header">
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <select
            v-if="column.type === 'topic'"
            v-model="topics"
            class="select is-large is-fullwidth"
          >
            <option
              v-for="{ label, value } in topicsByLang"
              :key="value.join('|')"
              :value="value"
            >
              {{ label }}
            </option>
          </select>
          <search-input
            v-if="column.type === 'search'"
            :type="paramsOpen === true ? 'search' : 'text'"
            :initial-query="params.query"
            class="input is-large is-fullwidth"
            @submit="onQueryChange"
          />
          <span class="icon is-left">
            <svg
              v-if="column.type === 'search'"
              viewBox="0 0 300 300"
            >
              <path d="M124.134,217.654a93.091,93.091,0,0,0,54-17.162L238.6,269.385h30.565l-74.2-84.185a93.518,93.518,0,1,0-70.829,32.454Zm0-164.039a70.52,70.52,0,1,1-70.519,70.519A70.6,70.6,0,0,1,124.134,53.615Z" />
            </svg>
            <svg
              v-if="column.type === 'topic'"
              viewBox="0 0 500 500"
            >
              <path d="M477.05,445.08H243.64l116.71-184.7Zm-164.63-37.9h95.85l-47.92-75.85Z" />
              <path d="M210.37,447.48H37.4v-173h173ZM75.29,409.58h97.18V312.41H75.29Z" />
              <path d="M273,227.44A86.49,86.49,0,1,1,359.44,141,86.59,86.59,0,0,1,273,227.44Zm0-135.07A48.59,48.59,0,1,0,321.55,141,48.64,48.64,0,0,0,273,92.37Z" />
            </svg>
          </span>
          <span
            class="icon is-right"
            @click="toggleFilters"
          >
            <svg viewBox="0 0 300 300">
              <path d="M109.547,47.059a49.378,49.378,0,0,0-47.878,37.57H30.824v23H61.563a49.286,49.286,0,0,0,96.021-.234H269.315v-23H157.37A49.38,49.38,0,0,0,109.547,47.059Zm0,74.6a25.3,25.3,0,1,1,25.3-25.3A25.328,25.328,0,0,1,109.547,121.657Z" />
              <path d="M176.7,252.941a49.38,49.38,0,0,0,47.875-37.557h44.372v-23H224.681a49.287,49.287,0,0,0-95.973,0H30.685v23H128.82A49.378,49.378,0,0,0,176.7,252.941Zm0-74.6a25.3,25.3,0,1,1-25.3,25.3A25.328,25.328,0,0,1,176.7,178.343Z" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <transition-group
      v-if="paramsOpen"
      name="curtain"
      tabindex="-1"
      tag="div"
      class="filters"
    >
      <div
        key="languages"
        class="field"
      >
        <div class="control has-icons-left">
          <div class="select is-large is-fullwidth">
            <select v-model="lang">
              <option
                v-for="{ label, value } in languages"
                :key="value || 'all'"
                :value="value"
              >
                {{ label }}
              </option>
            </select>
          </div>
          <span class="icon is-large is-left">
            <svg viewBox="0 0 300 300">
              <path d="M76.938,38.423v-.011h-23V262.144h23V161.5H244.264L191.842,97.413l54.409-58.99ZM195.735,138.5H76.938V61.423h116.81L161.387,96.509Z" />
            </svg>
          </span>
        </div>
      </div>

      <div
        key="close"
        class="field"
      >
        <button
          key="close"
          name="close"
          class="button close is-large is-fullwidth"
          aria-label="Delete the column"
          @click="$emit('close')"
        >
          <span class="icon is-large is-left">
            <svg viewBox="0 0 300 300">
              <path d="M200,269.231,223,84.615H77l23,184.616Zm-3.043-161.616L179.688,246.231H120.312L103.043,107.615Z" />
              <polygon points="122.996 15.346 122.996 38.423 77 38.423 77 61.423 223 61.423 223 38.423 176.846 38.423 176.846 15.346 122.996 15.346" />
            </svg>
          </span>
          <span>{{ $t('column.delete') }}</span>
        </button>
      </div>

      <div
        key="move-column"
        class="field move-column"
      >
        <button
          name="move-left"
          aria-label="Move column to left"
          class="btn btn-icon"
          @click="$emit('move', 'left')"
        >
          <span>
            <svg viewBox="0 0 300 300">
              <polygon points="146.308 236.646 63.687 150.055 146.297 62.936 146.319 30.769 30.769 150.01 146.308 269.231 146.308 236.646" />
            </svg>
          </span>
        </button>

        <button
          name="move-right"
          class="btn btn-icon"
          aria-label="Move column to right"
          @click="$emit('move', 'right')"
        >
          <span>
            <svg viewBox="0 0 300 300">
              <polygon points="153.78 63.354 236.402 149.945 153.791 237.064 153.77 269.231 269.319 149.99 153.78 30.769 153.78 63.354" />
            </svg>
          </span>
        </button>
      </div>
    </transition-group>
  </header>
</template>

<script>
import topicsConfig from '@/config/topics.json'
import SearchInput from '@/components/SearchInput'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SearchParams',
  components: {
    SearchInput
  },
  props: {
    columnId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      paramsOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'getColumnByIndex',
      'isAuthenticated'
    ]),
    column () {
      return this.getColumnByIndex(this.columnId)
    },
    params () {
      return this.column.params
    },
    languages () {
      return [
        {
          label: this.$t('languages.all'),
          value: null
        },
        {
          label: this.$t('languages.en'),
          value: 'en'
        },
        {
          label: this.$t('languages.fr'),
          value: 'fr'
        },
        {
          label: this.$t('languages.de'),
          value: 'de'
        },
        {
          label: this.$t('languages.es'),
          value: 'es'
        },
        {
          label: this.$t('languages.pt'),
          value: 'pt'
        },
        {
          label: this.$t('languages.ar'),
          value: 'ar'
        },
        {
          label: this.$t('languages.zh-tw'),
          value: 'zh-tw'
        },
        {
          label: this.$t('languages.zh-cn'),
          value: 'zh-cn'
        }
      ]
    },
    lang: {
      get () {
        return this.params.langs[0] || null
      },
      set (lang) {
        this.updateParams({ langs: lang ? [lang] : [], topics: [] })
      }
    },
    topicsByLang () {
      return topicsConfig[this.lang]
    },
    topics: {
      get () {
        return this.params.topics
      },
      set (topics) {
        this.updateParams({ topics })
      }
    },
    query () {
      return this.params.query
    },
    dateTo: {
      get () {
        return this.params.dateTo
      },
      set (dateTo) {
        this.updateParams({ dateTo })
      }
    },
    topicName () {
      if (this.column.type === 'topic' && this.topics.length > 0) {
        return this.topicsByLang.find(i => i.value.includes(this.topics[0])).label
      }
      return this.$t('topics.all')
    }
  },
  methods: {
    ...mapMutations([
      'updateColumnParams',
      'openColumnSettings',
      'closeColumnSettings'
    ]),
    ...mapActions([
      'refreshColumn'
    ]),
    updateParams (newParams) {
      const params = {
        ...this.params,
        ...newParams
      }
      this.updateColumnParams({ indexCol: this.columnId, params })
      this.$emit('reset')
    },
    onQueryChange (query) {
      this.updateParams({ query })
    },
    toggleFilters () {
      this.paramsOpen = this.paramsOpen ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

@import "bulma/sass/utilities/initial-variables";

$size-large: 1.2rem;

@import "bulma/sass/utilities/functions";
@import "bulma/sass/utilities/derived-variables";
@import "bulma/sass/utilities/mixins";
@import "bulma/sass/utilities/controls";
@import "bulma/sass/elements/icon";
@import "bulma/sass/elements/button";
@import "bulma/sass/form/_all";

header {
  padding: 0px 17px 0px 12px;

  svg {
    height: 22px;
    fill: $dark;
  }

  .header {
    select {
      padding-left: 50px;
      appearance: none;
      font-weight: 600;
      color: #4a4a4a;
      background-color: $light;
    }

    .input, .select {
      border-color: #dbdbdb;
      box-shadow: none;
    }

    .icon.is-right {
      pointer-events: all !important;
      cursor: pointer;
    }
  }

  .filters {
    background-color: $light;
    outline: none;

    .field {
      margin-bottom: 0;

      .control {
        .select {
          height: 52px;
          select {
            color: $secondary-color;
            border-radius: 0;
            font-weight: 400;
            font-size: 1rem;
            height: 100%;
            border-top: 0px;
          }
          &::after {
            right: 1.125em;
            width: 0.5rem;
            height: 0.5rem;
            border: 2px solid transparent;
            border-right: 0px;
            border-top: 0px;
            margin-top: -0.4rem;
            border-color: $grey_neutral_5;
          }
        }
      }
      .button.close {
        height: 52px;
        border-radius: 0;
        font-size: 1rem;
        color: $danger-color;
        border-top: 0px;
        &.is-fullwidth {
          justify-content: flex-start;
        }
        .icon {
          margin-left: calc(-0.4em);
          margin-right: 0.4em;
          svg {
            fill: $danger-color;
          }
        }
      }

      .icon {
        svg {
          fill: $grey_neutral_5;
        }
      }
      &.move-column {
        height: 52px;
        display: flex;
        border: 1px solid #dbdbdb;
        border-top: 0px;
        border-radius: 0;
        padding-left: 5px;

        svg {
          height: 22px;
          fill: #757575;
        }
      }
    }
  }
}
</style>