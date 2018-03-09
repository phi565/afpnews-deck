<template>
  <article :class="{
    flash: doc.urgency === 1,
    alerte: doc.urgency === 2,
    urgent: doc.urgency === 3,
    viewed
  }" @click="readArticle">
    <p class="published">{{ published }}</p>
    <h1>{{ headLine }}</h1>
    <p class="lead" v-if="doc.urgency > 2">{{ doc.news[0] }}</p>
  </article>
</template>

<script>
import bus from '@/utils/bus'
import moment from 'moment'

export default {
  name: 'document',
  props: {
    doc: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      viewed: false
    }
  },
  computed: {
    headLine () {
      return Array.isArray(this.doc.title) ? this.doc.title.join(' - ') : this.doc.title
    },
    published () {
      return moment(this.doc.published).calendar()
    }
  },
  methods: {
    readArticle () {
      this.viewed = true
      bus.$emit('setCurrentDocument', {
        id: this.doc.uno,
        title: this.headLine,
        body: this.doc.news,
        footer: this.published
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@afp/toolkit-styles/scss/variables.scss";
article {
  min-height: 90px;
  max-height: 200px;
  max-width: 100%;
  border-top: 1px solid #E1E8ED;
  border-bottom: 1px solid #E1E8ED;
  padding: 5px 12px;
  // overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }

  &.flash {
    background-color: $red_dark;
    color: white;
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
  }
  &.alerte {
    background-color: $yellow-butter-5;
  }
  &.urgent {
    background-color: lighten($yellow-butter-5, 20%);
  }

  &.viewed {
    opacity: 0.5;
  }

  h1 {
    font-size: 1rem;
    margin-top: 10px;
    margin-bottom: 12px;
  }

  p.published {
    font-size: 0.7rem;
    margin-bottom: 0px;
    margin-top: 5px;
  }

  p.lead {
    display: block;
    display: -webkit-box;
    margin-top: 0px;
    margin-bottom: 0px;
    max-height: 62px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
