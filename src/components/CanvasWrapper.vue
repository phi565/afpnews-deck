<template>
  <div>
    <img :src="require('@/assets/logo-afp-'+logoColor+'.png')" ref="logo" v-on:load="updateLogo">
    <img id="photo" ref="photo" :src="src" v-on:load="updatePhoto">
    <div :id="canvasIndex" :class="{draggable: draggable, dragging: drag}"></div>
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
    'orientation': {
      type: String,
      default: 'horizontal',
      enum: ['vertical', 'horizontal']
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
      drag: false,
      photoWidth: null,
      photoHeight: null,
      errors: {}
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
    },
    draggable () {
      return this.orientation === 'horizontal'
    },
    photoRatio () {
      return this.photoWidth / this.photoHeight
    },
    canvasWidth () {
      return this.width
    },
    canvasHeight () {
      if (this.orientation === 'horizontal') {
        return this.height
      } else if (this.orientation === 'vertical') {
        return this.canvasWidth / this.photoRatio
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
    textColor () {
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
    },
    orientation () {
      this.getPhotoDimensions()
    },
    canvasHeight (canvasHeight) {
      this._stage.setAttrs({
        height: canvasHeight
      })
      this.updatePhoto()
      this.updateReference()
      this.updateCopyright()
    },
    photoWidth (photoWidth) {
      if (photoWidth < this.canvasWidth) {
        this.$emit('error', {
          type: 'imageResolutionTooLow',
          message: 'The image resolution is too low'
        })
      }
    },
    photoHeight (photoHeight) {
      if (photoHeight < this.canvasHeight) {
        this.$emit('error', {
          type: 'imageResolutionTooLow',
          message: 'The image resolution is too low'
        })
      }
    }
  },

  methods: {
    draw (origin) {
      if (!this.loaded) return false
      this._layer.draw()
    },
    getPhotoDimensions () {
      const photo = this.$refs.photo

      this.photoWidth = photo.width
      this.photoHeight = photo.height
    },
    updatePhoto () {
      this.getPhotoDimensions()

      const photo = this.$refs.photo
      const canvasHeight = this.canvasHeight

      this._layer.find('.Image').setAttrs({
        x: 0,
        y: 0,
        image: photo,
        width: this.canvasWidth,
        height: this.canvasWidth / this.photoRatio,
        draggable: this.draggable,
        dragBoundFunc: function (pos) {
          if (pos.y > 0) pos.y = 0
          if (pos.y < -canvasHeight) pos.y = -canvasHeight
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

    updateLogo () {
      const logo = this.$refs.logo
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
        y: this.canvasHeight - text.height() - 20
      })
    },

    updateReference () {
      const text = this._layer.find('.Reference')[0]
      if (!text) return false
      text.setAttrs(this.textAttrs)
      text.text(this.reference)
      text.setAttrs({
        x: 20,
        y: this.canvasHeight - text.height() - 20
      })
    }
  }
}
</script>

<style scoped>
img {
  display: none;
}
img#photo {
  width: 100%;
}
.draggable {
  cursor: grab;
}
.draggable.dragging {
  cursor: grabbing;
}
</style>
