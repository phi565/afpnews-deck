<template>
  <main>
    <transition-group
      id="columns"
      name="list"
      tag="div"
    >
      <column
        v-for="(column, i) in columns"
        :key="`column-${column.id}`"
        :column-id="i"
      />
      <add-column key="add-column" />
    </transition-group>
    <side-bar />
    <router-view />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Column from '@/components/Column.vue'
import AddColumn from '@/components/AddColumn.vue'
import SideBar from '@/components/SideBar.vue'
import autoRefreshVisibility from '@/mixins/autoRefreshVisibility'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'Deck',
  metaInfo () {
    if (this.preview) {
      let imageMetas: Array<any> = []
      if (this.preview.image) {
        imageMetas = [
          {
            property: 'og:image',
            content: this.preview.image.href
          },
          {
            property: 'og:image:type',
            content: 'image/jpeg'
          },
          {
            property: 'og:image:width',
            content: this.preview.image.width
          },
          {
            property: 'og:image:height',
            content: this.preview.image.height
          }
        ]
      }
      return {
        title: this.preview.title,
        meta: [
          {
            vmid: 'description',
            property: 'description',
            content: this.preview.text
          },
          {
            property: 'og:title',
            content: `${this.preview.title} - AFP Deck`
          },
          {
            property: 'og:description',
            content: this.preview.text
          },
          {
            property: 'og:type',
            content: 'article'
          },
          {
            property: 'og:url',
            content: `${window.location.origin}/#${this.preview.url}`
          },
          ...imageMetas
        ]
      }
    }

    return {
      titleTemplate: titleChunk => titleChunk ? `${titleChunk} | AFP Deck` : 'AFP Deck',
      meta: [
        {
          vmid: 'description',
          property: 'description',
          content: 'AFP News Deck is a reader for AFP feeds. It allows you to find and read stories, multimedia articles and photos directly in your browser.'
        }
      ]
    }
  },
  components: {
    Column,
    AddColumn,
    SideBar
  },
  mixins: [
    autoRefreshVisibility
  ],
  props: {
    preview: {
      type: Object,
      required: false,
      default: null
    }
  },
  computed: {
    ...mapState([
      'authType',
      'columns'
    ])
  },
  watch: {
    authType (newVal, oldVal) {
      if (newVal !== 'credentials' && oldVal === 'credentials') {
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.path
          }
        })
      }
    }
  },
  mounted () {
    this.refreshAllColumns()
  },
  methods: {
    ...mapActions([
      'refreshAllColumns'
    ])
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

main {
  @media screen {
    background-color: $background-color;
    height: 100%;

    #columns {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      touch-action: auto;
      height: 100%;
      display: flex;
      user-select: none;
      scroll-snap-type: x mandatory;
    }
  }
  @media print {
    #columns {
      display: none;
    }
  }
}

.list-leave-to {
  transform: translate(0%, -100%);
}
.list-leave-active, .list-move {
  transition: transform 0.5s;
}
</style>
