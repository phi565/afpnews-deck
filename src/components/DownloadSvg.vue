<template>
  <button @click="downloadSvg">Download</button>
</template>

<script>
  export default {
    name: 'download-svg',
    data () {
      return {
        doctype: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
        prefix: {
          xmlns: 'http://www.w3.org/2000/xmlns/',
          xlink: 'http://www.w3.org/1999/xlink',
          svg: 'http://www.w3.org/2000/svg'
        },
        emptySvgDeclarationComputed: ''
      }
    },
    mounted () {
      var emptySvg = window.document.createElementNS(this.prefix.svg, 'svg')
      window.document.body.appendChild(emptySvg)
      this.emptySvgDeclarationComputed = getComputedStyle(emptySvg)
    },
    methods: {
      downloadSvg () {
        const svg = this.getSvgInfo()
        this.download(svg)
      },
      getSvgInfo () {
        let svg = document.getElementById('svg')
        svg.setAttribute('version', '1.1')
        svg.removeAttribute('xmlns')
        svg.removeAttribute('xlink')
        if (!svg.hasAttributeNS(this.prefix.xmlns, 'xmlns')) {
          svg.setAttributeNS(this.prefix.xmlns, 'xmlns', this.prefix.svg)
        }
        if (!svg.hasAttributeNS(this.prefix.xmlns, 'xmlns:xlink')) {
          svg.setAttributeNS(this.prefix.xmlns, 'xmlns:xlink', this.prefix.xlink)
        }
        svg = this.setInlineStyles(svg, this.emptySvgDeclarationComputed)
        const source = (new XMLSerializer()).serializeToString(svg)
        var rect = svg.getBoundingClientRect()

        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          class: svg.getAttribute('class'),
          id: svg.getAttribute('id'),
          name: svg.getAttribute('name'),
          childElementCount: svg.childElementCount,
          source: [this.doctype + source]
        }
      },
      download (source) {
        var filename = 'untitled'

        if (source.name) {
          filename = source.name
        } else if (source.id) {
          filename = source.id
        } else if (source.class) {
          filename = source.class
        } else if (window.document.title) {
          filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
        }

        var url = window.URL.createObjectURL(new Blob(source.source, { 'type': 'text/xml' }))

        var a = document.createElement('a')
        document.body.appendChild(a)
        a.setAttribute('class', 'svg-crowbar')
        a.setAttribute('download', filename + '.svg')
        a.setAttribute('href', url)
        a.style['display'] = 'none'
        a.click()
      },
      setInlineStyles (svg, emptySvgDeclarationComputed) {
        function explicitlySetStyle (element) {
          var cSSStyleDeclarationComputed = getComputedStyle(element)
          var i, len, key, value
          var computedStyleStr = ''
          for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
            key = cSSStyleDeclarationComputed[i]
            value = cSSStyleDeclarationComputed.getPropertyValue(key)
            if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
              computedStyleStr += key + ':' + value + ';'
            }
          }
          element.setAttribute('style', computedStyleStr)
        }
        function traverse (obj) {
          var tree = []
          tree.push(obj)
          visit(obj)
          function visit (node) {
            if (node && node.hasChildNodes()) {
              var child = node.firstChild
              while (child) {
                if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
                  tree.push(child)
                  visit(child)
                }
                child = child.nextSibling
              }
            }
          }
          return tree
        }
        // hardcode computed css styles inside svg
        var allElements = traverse(svg)
        var i = allElements.length
        while (i--) {
          explicitlySetStyle(allElements[i])
        }
        return svg
      }
    }
  }
</script>

<style lang='scss' scoped></style>