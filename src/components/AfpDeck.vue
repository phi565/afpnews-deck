<template>
  <div id="afpdeck">
    <side-bar @addColumn="$emit('addColumn')" :autoRefresh="autoRefresh" @update:autoRefresh="val => { $emit('update:autoRefresh', val) }"></side-bar>
    <div id="columns">
      <column
        v-for="(column, i) in columns"
        :key="`${i}-${column.name}`"
        :documents="column.documents"
        :documentsCount="column.documentsCount"
        :processing="column.processing"
        :error="column.error"
        @close="$emit('closeColumn', i)"
        @move="val => { $emit('moveColumn', i, val) }"
        @refresh="$emit('refreshColumn', i)"
        @reset="$emit('resetColumn', i)"
        @loadMore="$emit('loadMoreDocuments', i)"
        :params.sync="column.params"
        @update:params="$emit('columnParamsChanged')"
        :name.sync="column.name"
        @update:name="$emit('columnNameChanged')"
        :paramsOpen.sync="column.paramsOpen">
      </column>
    </div>
    <modal v-if="currentDocument" @close="currentDocument = null">
      <h3 slot="header">{{ currentDocument.title }}</h3>
      <article slot="body">
        <p v-for="p in currentDocument.body" v-html="p" v-linkified></p>
      </article>
      <p slot="footer">{{ currentDocument.footer }}</p>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '@/utils/bus'
import SideBar from '@/components/SideBar'
import Column from '@/components/Column'
import Modal from '@/components/Modal'
import VueLinkify from 'vue-linkify'

Vue.directive('linkified', VueLinkify)

export default {
  name: 'afp-deck',
  props: {
    columns: {
      type: Array
    },
    autoRefresh: {
      type: Boolean
    }
  },
  components: { SideBar, Column, Modal },
  data () {
    return {
      currentDocument: null
    }
  },
  created () {
    bus.$on('setCurrentDocument', data => {
      this.currentDocument = data
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@afp/toolkit-styles/scss/variables.scss";
#afpdeck {
  height: 100vh;
  max-height: 100vh;
  display: flex;

  #columns {
    background-color: #E1E8ED;
    flex: 1;
    display: flex;
    overflow-x: scroll;
    height: 100%;
  }
}
</style>
