<template>
  <article :class="className">
    <div class="image-container">
      <canvas-wrapper :width="width" :height="height" :index="index" :src="file.dataUrl" :textColor="textColor" :logoColor="logoColor" :copyright="copyright" :reference="reference" ref="canvas"></canvas-wrapper>
    </div>
    <div>
      <select v-model="logoColor">
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="transparent">Transparent</option>
      </select>
      <select v-model="textColor">
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>
      <input v-model="copyrightUser">
      <button @click="download">Download</button>
    </div>
    <div class="progress" :style="{width: file.progress+'%'}" v-if="file.status !== 'success' && file.status !== 'error'"></div>
  </article>
</template>

<script>
// import { mapMutations } from 'vuex'
// import { NAMESPACE } from '@/config'
// import { INCREMENT } from '@/config/mutations'

import CanvasWrapper from './CanvasWrapper'
import download from 'downloadjs'

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
      copyrightUser: null
    }
  },

  computed: {
    className () {
      if (this.file.status === 'success' && this.meta.iptc === false) return 'error'
      return this.file.status
    },
    meta () {
      try {
        const json = JSON.parse(this.file.xhrResponse.response)
        return json.find(d => d.name === this.file.name)
      } catch (e) {
        return false
      }
    },
    photographer () {
      if (this.meta.iptc && this.meta.iptc.by_line && Array.isArray(this.meta.iptc.by_line)) {
        return this.meta.iptc.by_line.join(', ')
      }
      return ''
    },
    copyright () {
      if (this.copyrightUser && this.copyrightUser !== '') return this.copyrightUser
      return this.photographer ? `${this.photographer} / ${this.copyrightSuffix}` : this.copyrightSuffix
    },
    reference () {
      const regex = new RegExp(/_?([A-Z0-9]{5})\./g)
      const found = regex.exec(this.file.name)
      if (found && found[1]) return found[1]
      return ''
    }
  },

  watch: {
    photographer (photographer) {
      this.copyrightUser = this.copyright
    }
  },

  methods: {
    // ...mapMutations(NAMESPACE, {
    // }),
    download () {
      const image2Save = this.$refs.canvas._stage.toDataURL({
        mimeType: 'image/jpeg',
        quality: 1
      })
      const date = new Date().getTime()
      download(image2Save, `toolkit-watermark-${date}.jpg`, 'image/jpeg')
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
  border: 1px solid green;
}
article.error {
  border: 1px solid red;
}
.image-container {

}
.progress {
  height: 3px;
  background-color: black;
}
</style>
