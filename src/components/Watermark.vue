<template>
  <article :class="className">
    <div class="image-container">
      <canvas-wrapper 
        :width="width" 
        :height="height" 
        :index="index" 
        :src="file.dataUrl" 
        :textColor="textColor" 
        :logoColor="logoColor" 
        :copyright="copyright" 
        :reference="reference" 
        :orientation="orientation" 
        v-on:error="errorHandler" 
        ref="canvas">
      </canvas-wrapper>
    </div>
    <div>
      <div class="action-group colors">
        <select v-model="logoColor">
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="transparent">Transparent</option>
        </select>
        <select v-model="textColor">
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </div>
      <div class="action-group texts">
        <input v-model="referenceUser">
        <input v-model="copyrightUser">
      </div>
      <div class="action-group actions">
        <button @click="toggleOrientation">Switch</button>
        <button @click="removeFile">Delete</button>
        <button @click="download">Download</button>
      </div>
    </div>
    <ul class="errors" v-if="className === 'error'">
      <li v-for="(message, key) in errors">{{ message }}</li>
    </ul>
    <div class="progress" :style="{width: file.progress+'%'}" v-if="file.status !== 'success' && file.status !== 'error'"></div>
  </article>
</template>

<script>
// TODO : look if it would be possible to work in ssr with downloadjs
import CanvasWrapper from './CanvasWrapper'
import download from 'downloadjs'

const toTitleCase = str => str
  .replace(/\w\S*/g, txt => txt
    .charAt(0)
    .toUpperCase() + txt.substr(1)
    .toLowerCase()
  )

export default {
  name: 'Watermark',

  components: {
    CanvasWrapper
  },

  props: ['file', 'index'],

  data () {
    return {
      textColor: 'white',
      logoColor: 'white',
      copyrightSuffix: 'AFP',
      width: 500,
      height: 315,
      pixelRatio: 2,
      copyrightUser: null,
      referenceUser: null,
      orientation: 'horizontal',
      errors: {}
    }
  },

  computed: {
    className () {
      if (this.file.status === 'success' && this.meta.iptc === false) return 'error'
      if (Object.keys(this.errors).length > 0) return 'error'
      return this.file.status
    },
    meta () {
      try {
        const json = JSON.parse(this.file.xhrResponse.response)
        return json.find(d => d.name === this.file.name)
      } catch (e) {
        this.$set(this.errors, 'metaDataInvalid', 'Metadata are invalid')
        return false
      }
    },
    photographer () {
      if (this.meta.iptc && this.meta.iptc.by_line && Array.isArray(this.meta.iptc.by_line)) {
        return this.meta.iptc.by_line.map(toTitleCase).join(', ')
      }
      this.$set(this.errors, 'photographerNotFound', 'The photographer was not found')
      return ''
    },
    copyright () {
      if (this.copyrightUser && this.copyrightUser !== '') return this.copyrightUser
      return this.photographer ? `${this.photographer} / ${this.copyrightSuffix}` : this.copyrightSuffix
    },
    reference () {
      if (this.referenceUser && this.referenceUser !== '') return this.referenceUser
      const regex = new RegExp(/_?([A-Z0-9]{5})/g)
      const found = regex.exec(this.file.name)
      if (found && found[1]) {
        this.referenceUser = found[1]
        return found[1]
      }
      this.$set(this.errors, 'referenceNotFound', 'The image reference was not found')
      return ''
    }
  },

  watch: {
    photographer (photographer) {
      this.copyrightUser = this.copyright
    }
  },

  mounted () {
    if (this.photographer !== '') this.copyrightUser = this.copyright
  },

  methods: {
    download () {
      const image2Save = this.$refs.canvas._stage.toDataURL({
        mimeType: 'image/jpeg',
        quality: 1
      })
      const date = new Date().getTime()
      download(image2Save, `toolkit-watermark-${date}.jpg`, 'image/jpeg')
    },
    removeFile () {
      this.$parent.removeFile(this.file)
    },
    toggleOrientation () {
      if (this.orientation === 'horizontal') {
        this.orientation = 'vertical'
      } else if (this.orientation === 'vertical') {
        this.orientation = 'horizontal'
      }
    },
    errorHandler (error) {
      this.$set(this.errors, error.type, error.message)
    }
  }
}
</script>

<style scoped>
article {
  width: 500px;
  margin: 15px;
}
article.success {
  /*border: 1px solid green;*/
}
article.error {
  border: 7px solid red;
}
ul.errors {
  list-style-type: none;
  text-align: left;
  color: darkred;
}
.image-container {

}
.progress {
  height: 3px;
  background-color: black;
}
.action-group {
  margin-bottom: 8px;
}
.action-group.colors {
  margin-top: 8px;
}
.action-group.colors select {
  width: 49%;
}
.action-group.texts input {
  width: 49%;
}
.action-group.actions {
  text-align: right;
}
button, input, select {
  font-size: 18px;
  border: none;
  background: none;
  box-sizing: border-box;
}
button {
  background-color: #9fb4b8;
  width: 120px;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  border-radius: 2px;
  padding: 0 1rem;
  transition: background-color 0.2s linear;
}
button:hover {
  background-color: #b1c8cc;
}
input {
  height: 48px;
  border: 1px solid #9fb4b8;
}
select {
  height: 48px;
  border: 1px solid #9fb4b8;
}
</style>
