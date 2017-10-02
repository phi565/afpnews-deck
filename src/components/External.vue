<template>
  <div>
    <vue-clip :options="options" :on-queue-complete="queueCompleted">
      <template slot="clip-uploader-action" scope="params">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message"><h2>Click or Drag and Drop files here upload </h2></div>
        </div>
      </template>

      <template slot="clip-uploader-body" scope="props">
        <main>
          <watermark v-for="file,index in props.files" :file="file" :index="index" :key="file.name" ref="watermark"></watermark>
        </main>
      </template>
    </vue-clip>
    <button v-if="loaded" @click="download">Download</button>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { NAMESPACE } from '@/config'
// import { COUNT } from '@/config/getters'

import Watermark from './Watermark'

export default {
  name: 'External',

  components: { Watermark },

  data () {
    return {
      loaded: false,
      options: {
        url: 'http://localhost:3000/',
        paramName: 'files',
        method: 'post',
        parallelUploads: 10,
        maxFilesize: {
          limit: 15,
          message: '{{ filesize }} is greater than the {{ maxFilesize }}'
        },
        uploadMultiple: true,
        maxFiles: {
          limit: 15,
          message: 'You can only upload a max of 10 files'
        },
        acceptedFiles: {
          extensions: ['image/*'],
          message: 'You are uploading an invalid file'
        },
        thumbnailWidth: 1000,
        thumbnailHeight: null,
        thumbnailMethod: 'contain'
      }
    }
  },

  computed: {
    // ...mapGetters(NAMESPACE, {
    // })
  },

  methods: {
    queueCompleted () {
      this.loaded = true
    },
    download () {
      this.$refs.watermark.forEach(watermark => watermark.download())
    }
  }
}
</script>

<style scoped>
.upload-action.is-dragging {
  border: 1px dashed lightblue;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
