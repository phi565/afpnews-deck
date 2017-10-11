<template>
  <div>
    <img :src="require('@/assets/logo-afp-'+logoColor+'.png')" v-on:load="updateLogo">
    <img class="photo" :src="src" v-on:load="updateImage">
    <div :id="canvasIndex" :class="{canvas: true, dragging: drag}"></div>
  </div>
</template>

<script>
// TODO : look if it would be possible to work in ssr with konva-node
import Konva from 'konva/src/Core'
import 'konva/src/Animation'
import 'konva/src/DragAndDrop'
import 'konva/src/shapes/Rect'
import 'konva/src/shapes/Image'
import 'konva/src/shapes/Text'

export default {
  name: 'Canvas-Wrapper',

  props: {
    'index': {
      type: Number,
      required: true
    },
    'src': {
      type: String,
      required: true
    },
    'width': {
      type: Number,
      default: 500
    },
    'height': {
      type: Number,
      default: 315
    },
    'textColor': {
      type: String,
      default: 'white'
    },
    'logoColor': {
      type: String,
      default: 'white'
    },
    'copyright': {
      type: String
    },
    'reference': {
      type: String
    }
  },

  data () {
    return {
      _stage: null,
      _layer: null,
      loaded: false,
      drag: false
    }
  },

  computed: {
    canvasIndex () {
      return `canvas-container-${this.index}`
    },
    textAttrs () {
      return {
        fontFamily: 'Source Sans Pro',
        fontSize: 12,
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 10,
        fill: this.textColor
      }
    }
  },

  created () {
    Konva.pixelRatio = this.pixelRatio
  },

  mounted () {
    this._stage = new Konva.Stage({
      container: this.canvasIndex,
      width: this.width,
      height: this.height
    })

    this._layer = new Konva.Layer()

    this._layer.add(new Konva.Image({name: 'Image'}))
    this._layer.add(new Konva.Image({name: 'Logo'}))
    this._layer.add(new Konva.Text({name: 'Copyright'}))
    this._layer.add(new Konva.Text({name: 'Reference'}))

    this._stage.add(this._layer)

    this.updateCopyright()
    this.updateReference()
  },

  watch: {
    textColor (textColor) {
      this.updateTextColor()
      this.draw()
    },
    copyright () {
      this.updateCopyright()
      this.draw()
    },
    reference () {
      this.updateReference()
      this.draw()
    }
  },

  methods: {
    draw (origin) {
      if (!this.loaded) return false
      this._layer.draw()
    },
    updateImage (ev) {
      const image = ev.currentTarget
      const canvasHeight = this.height
      if (image.width < this.width || image.height < this.height) {
        this.$parent.$emit('error', {
          error: 'imageResolutionTooLow',
          message: 'The image resolution is too low'
        })
      }
      const ratio = image.width / image.height
      const width = image.width < this.width * 2 ? this.width : image.width / 2
      const height = image.height < this.height * 2 ? width / ratio : image.height / 2
      this._layer.find('.Image').setAttrs({
        x: 0,
        y: 0,
        image: image,
        width: width,
        height: height,
        draggable: true,
        dragBoundFunc: function (pos) {
          if (pos.y > 0) pos.y = 0
          if (pos.y < canvasHeight - height) pos.y = canvasHeight - height
          return {
            x: this.getAbsolutePosition().x,
            y: pos.y
          }
        }
      }).on('dragstart', () => {
        this.drag = true
      }).on('dragend', () => {
        this.drag = false
      })
      this.loaded = true
      this.draw()
    },

    updateLogo (ev) {
      const logo = ev.currentTarget
      this._layer.find('.Logo').setAttrs({
        x: 15,
        y: 10,
        image: logo,
        width: logo.width / 2,
        height: logo.height / 2,
        draggable: false
      })
      this.draw()
    },

    updateTextColor () {
      this._layer.find('.Copyright, .Reference').setAttrs({
        fill: this.textColor
      })
    },

    updateCopyright () {
      const text = this._layer.find('.Copyright')[0]
      if (!text) return false
      text.setAttrs(this.textAttrs)
      text.text(this.copyright)
      text.setAttrs({
        x: this.width - text.width() - 20,
        y: this.height - text.height() - 20
      })
    },

    updateReference () {
      const text = this._layer.find('.Reference')[0]
      if (!text) return false
      text.setAttrs(this.textAttrs)
      text.text(this.reference)
      text.setAttrs({
        x: 20,
        y: this.height - text.height() - 20
      })
    }
  }
}
</script>

<style scoped>
img {
  display: none;
}
img.photo {
  width: 100%;
}
.canvas {
  cursor: grab;
}
.canvas.dragging {
  cursor: grabbing;
}
</style>
