<template>
  <div
    v-on-clickaway="close"
    class="add-column"
  >
    <div
      :class="{
        'is-active': isActive
      }"
      class="dropdown"
      @click="isActive = !isActive"
    >
      <div class="dropdown-trigger">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu2"
        >
          <span class="icon">
            <svg viewBox="0 0 300 300">
              <polygon points="138.5 246.16 161.5 246.16 161.5 161.5 246.159 161.5 246.159 138.5 161.5 138.5 161.5 53.84 138.5 53.84 138.5 138.5 53.841 138.5 53.841 161.5 138.5 161.5 138.5 246.16" />
            </svg>
          </span>
          <span>{{ $t('deck.add-column') }}</span>
        </button>
      </div>
      <div
        id="dropdown-menu2"
        class="dropdown-menu"
        role="menu"
      >
        <div class="dropdown-content">
          <a
            class="dropdown-item"
            @click="search('search')"
          >
            <p>
              <svg viewBox="0 0 300 300">
                <path d="M124.134,217.654a93.091,93.091,0,0,0,54-17.162L238.6,269.385h30.565l-74.2-84.185a93.518,93.518,0,1,0-70.829,32.454Zm0-164.039a70.52,70.52,0,1,1-70.519,70.519A70.6,70.6,0,0,1,124.134,53.615Z" />
              </svg>
              {{ $t('deck.add-column-search-title') }}
            </p>
            <p>{{ $t('deck.add-column-search-desc') }}</p>
          </a>
          <hr class="dropdown-divider">
          <a
            class="dropdown-item"
            @click="search('topic')"
          >
            <p>
              <svg viewBox="0 0 500 500">
                <path d="M477.05,445.08H243.64l116.71-184.7Zm-164.63-37.9h95.85l-47.92-75.85Z" />
                <path d="M210.37,447.48H37.4v-173h173ZM75.29,409.58h97.18V312.41H75.29Z" />
                <path d="M273,227.44A86.49,86.49,0,1,1,359.44,141,86.59,86.59,0,0,1,273,227.44Zm0-135.07A48.59,48.59,0,1,0,321.55,141,48.64,48.64,0,0,0,273,92.37Z" />
              </svg>
              {{ $t('deck.add-column-topic-title') }}
            </p>
            <p>{{ $t('deck.add-column-topic-desc') }}</p>
          </a>
        </div>
      </div>
    </div>
    <button
      class="btn btn-circle btn-icon mobile-button"
      @click="newColumn"
    >
      <i class="UI-icon UI-plus" />
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { directive as onClickaway } from 'vue-clickaway'

export default {
  name: 'AddColumn',
  directives: {
    onClickaway
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapState([
      'locale',
      'defaultLang'
    ])
  },
  methods: {
    ...mapMutations([
      'addColumn'
    ]),

    search (type) {
      if (this.$route.name !== 'deck') this.$router.push({ name: 'deck' })
      this.addColumn({
        type,
        params: {
          langs: this.defaultLang ? [this.defaultLang] : [this.locale],
          products: type === 'topic' ? ['multimedia'] : []
        }
      })
    },

    close () {
      this.isActive = false
    },

    newColumn () {
      this.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
      this.isActive = true
    }
  }
}
</script>

<style lang="scss">
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
  @import "bulma/sass/components/dropdown";

  .add-column{
    min-width: 310px;
    scroll-snap-align: start;
    .dropdown{
      &.is-active{
        .button{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
      }
      .dropdown-trigger{
        .button{
          background: #F5F6F6;
          width: 280px;
          height: 49px;
          justify-content: left;
          outline: none;
          &:focus{
            border-color: transparent;
          }
          &:focus:not(:active){
            box-shadow: none;
          }
        }
      }
      .icon{
        svg{
          height: 15px;
        }
      }
    }
    .dropdown-menu{
      padding-top: 0px;
      .dropdown-content{
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
      hr{
        width: 50%;
        transform: translateX(50%);
      }
      .dropdown-item{
        min-width: 280px;
        min-width: 280px;
        width: 280px;
        p{
          font-size: 12px;
        }
        p:first-child{
          font-size: 18px;
          svg{
            height: 15px;
          }
        }
      }
    }
    .mobile-button{
      display: block;
      position: absolute !important;
      bottom: 29px;
      right: 24px;
      margin: 4px;
      background: $dark !important;

      i {
        top: -3px;
      }

      &:before{
        background: $primary-color !important;
      }
      &:after{
        box-shadow: none !important;
      }
    }
  }

</style>
