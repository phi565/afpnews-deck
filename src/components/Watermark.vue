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
        :crop="crop" 
        v-on:addError="addErrorHandler" 
        v-on:deleteError="deleteErrorHandler" 
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
        <input type="text" v-model="referenceUser">
        <input type="text" v-model="copyrightUser">
      </div>
      <div class="action-group actions">
        <input type="checkbox" :id="'crop'+index" v-model="crop">
        <label :for="'crop'+index">Crop</label>
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
      crop: true,
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
        this.$delete(this.errors, 'metaDataInvalid')
        return json.find(d => d.name === this.file.name)
      } catch (e) {
        return false
      }
    },
    photographer () {
      if (this.meta.iptc && this.meta.iptc.by_line && Array.isArray(this.meta.iptc.by_line)) {
        this.$delete(this.errors, 'photographerNotFound')
        return this.meta.iptc.by_line.map(toTitleCase).join(', ')
      } else {
        this.$set(this.errors, 'photographerNotFound', 'The photographer was not found')
        return ''
      }
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
        this.$delete(this.errors, 'referenceNotFound')
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
    addErrorHandler (error) {
      this.$set(this.errors, error.type, error.message)
    },
    deleteErrorHandler (error) {
      this.$delete(this.errors, error.type)
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
input[type="text"] {
  height: 48px;
  border: 1px solid #9fb4b8;
}
select {
  height: 48px;
  border: 1px solid #9fb4b8;
}
</style>
