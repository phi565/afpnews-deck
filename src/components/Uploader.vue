<template>
  <div>
    <vue-clip :options="options" :on-queue-complete="queueCompleted" :on-removed-file="removedFile" ref="vc">
      <template slot="clip-uploader-action" scope="params">
        <div v-bind:class="{'is-dragging': params.dragging}" class="upload-action">
          <div class="dz-message">
            <h2 v-if="!loaded">Click or Drag and Drop here to load images</h2>
            <h2 v-else>Done ! Upload more ?</h2>
          </div>
        </div>
      </template>

      <template slot="clip-uploader-body" scope="props">
        <main>
          <watermark v-for="file,index in props.files" :file="file" :index="index" :key="file.name" ref="watermark" v-if="file.status !== 'removed'"></watermark>
        </main>
      </template>
    </vue-clip>
    <div class="actions">
      <button v-if="loaded" @click="deleteAll">Delete all</button>
      <button v-if="loaded" @click="downloadAll">Download all</button>
    </div>
  </div>
</template>

<script>
import Watermark from './Watermark'
import Clip from '../../../../vue-clip'

export default {
  name: 'Uploader',

  components: { Watermark, 'vue-clip': Clip },

  props: ['iptc-parser-url'],

  data () {
    return {
      loaded: false,
      options: {
        url: this.iptcParserUrl,
        paramName: 'files',
        method: 'post',
        parallelUploads: 10,
        headers: {
          'accept': 'multipart/form-data'
        },
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
        thumbnailMethod: 'contain',
        resizeWidth: 100,
        resizeHeight: 100,
        resizeQuality: 0.1,
        resizeMethod: 'crop'
      }
    }
  },

  methods: {
    queueCompleted () {
      this.loaded = true
    },
    removedFile () {
      if (this.$refs.vc.files.filter(file => file.status !== 'removed').length === 0) {
        this.loaded = false
      }
    },
    downloadAll () {
      this.$refs.watermark
        .forEach(watermark => watermark.download())
    },
    deleteAll () {
      this.$refs.watermark
        .forEach(watermark => this.$refs.vc.removeFile(watermark.file))
    }
  }
}
</script>

<style scoped>
.upload-action {
  background-color: #e7f0f4;
  padding: 160px 150px;
}
.upload-action .dz-message {
  text-align: center;
  background-color: #d9e4ea;
  border: 2px dashed #9fb4b8;
  padding: 48px 64px;
  transition: all 0.2s linear;
}
.upload-action.is-dragging {

}
.upload-action.is-dragging .dz-message {
  border: 2px dashed #d5dfe3;
  background-color: white;
}
.actions {
  text-align: center;
  margin: 50px;
}
button {
  background-color: #9fb4b8;
  width: 420px;
  height: 70px;
  line-height: 70px;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  border-radius: 2px;
  padding: 0 1rem;
  transition: background-color 0.2s linear;
  border: none;
}
button:hover {
  background-color: #b1c8cc;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
