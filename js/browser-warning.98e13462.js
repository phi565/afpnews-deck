(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["browser-warning"],{"0f33":function(e,t,n){"use strict";var a=n("34ab"),o=n.n(a);o.a},"34ab":function(e,t,n){},"47cd":function(e,t,n){},6580:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("modal",{on:{close:function(t){return e.$router.push({name:"deck"})}},scopedSlots:e._u([{key:"header",fn:function(){return[n("h3",[e._v(e._s(e.$t("browser-warning.title")))]),n("router-link",{staticClass:"btn btn-icon close",attrs:{to:{name:"deck"},"aria-label":"Close"}},[n("i",{staticClass:"UI-icon UI-close-alt icon-small"})])]},proxy:!0},{key:"body",fn:function(){return[n("p",[e._v(e._s(e.$t("browser-warning.description")))]),n("h4",[e._v(e._s(e.$t("browser-warning.unsupported-features")))]),n("ul",e._l(e.$modernizr.unsupportedFeatures,function(t){var a=t[0];return n("li",{key:a},[e._v("\n        "+e._s(a)+"\n      ")])}),0)]},proxy:!0}])})},o=[],i=n("2b0e"),s=n("714b"),r=i["default"].extend({name:"BrowserWarning",metaInfo:{title:"Browser warning"},components:{Modal:s["a"]}}),c=r,l=(n("ea96"),n("2877")),u=Object(l["a"])(c,a,o,!1,null,"5f77f8e3",null);t["default"]=u.exports},"714b":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"modal"}},[n("div",{staticClass:"modal-mask"},[n("div",{staticClass:"modal-wrapper"},[n("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.close,expression:"close"}],staticClass:"modal-container"},[n("div",{staticClass:"actions"},[e._t("actions")],2),n("div",{staticClass:"modal-header"},[e._t("header")],2),n("div",{staticClass:"modal-body"},[e._t("body")],2),n("div",{staticClass:"modal-footer"},[e._t("footer")],2)])])])])},o=[],i=n("2b0e"),s=n("c7db"),r=i["default"].extend({name:"Modal",mixins:[s["mixin"]],methods:{close:function(){this.$emit("close")}}}),c=r,l=(n("0f33"),n("2877")),u=Object(l["a"])(c,a,o,!1,null,"09edb7b6",null);t["a"]=u.exports},c7db:function(e,t,n){"use strict";var a=n("2b0e");a="default"in a?a["default"]:a;var o="2.2.2",i=/^2\./.test(a.version);i||a.util.warn("VueClickaway "+o+" only supports Vue 2.x, and does not support Vue "+a.version);var s="_vue_clickaway_handler";function r(e,t,n){c(e);var a=n.context,o=t.value;if("function"===typeof o){var i=!1;setTimeout(function(){i=!0},0),e[s]=function(t){var n=t.path||(t.composedPath?t.composedPath():void 0);if(i&&(n?n.indexOf(e)<0:!e.contains(t.target)))return o.call(a,t)},document.documentElement.addEventListener("click",e[s],!1)}}function c(e){document.documentElement.removeEventListener("click",e[s],!1),delete e[s]}var l={bind:r,update:function(e,t){t.value!==t.oldValue&&r(e,t)},unbind:c},u={directives:{onClickaway:l}};t.version=o,t.directive=l,t.mixin=u},ea96:function(e,t,n){"use strict";var a=n("47cd"),o=n.n(a);o.a}}]);
//# sourceMappingURL=browser-warning.98e13462.js.map