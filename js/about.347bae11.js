(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"57ca":function(t,e,n){},9224:function(t){t.exports=JSON.parse('{"a":"1.5.2-beta"}')},"991f":function(t,e,n){},a19c:function(t,e,n){"use strict";n("991f")},c7db:function(t,e,n){"use strict";var a=n("2b0e");a="default"in a?a["default"]:a;var i="2.2.2",s=/^2\./.test(a.version);s||a.util.warn("VueClickaway "+i+" only supports Vue 2.x, and does not support Vue "+a.version);var o="_vue_clickaway_handler";function c(t,e,n){l(t);var a=n.context,i=e.value;if("function"===typeof i){var s=!1;setTimeout((function(){s=!0}),0),t[o]=function(e){var n=e.path||(e.composedPath?e.composedPath():void 0);if(s&&(n?n.indexOf(t)<0:!t.contains(e.target)))return i.call(a,e)},document.documentElement.addEventListener("click",t[o],!1)}}function l(t){document.documentElement.removeEventListener("click",t[o],!1),delete t[o]}var r={bind:c,update:function(t,e){e.value!==e.oldValue&&c(t,e)},unbind:l},u={directives:{onClickaway:r}};e.version=i,e.directive=r,e.mixin=u},ee65:function(t,e,n){"use strict";n("57ca")},f820:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("panel",{staticClass:"about",on:{close:function(e){return t.$router.push({name:"deck"})}},scopedSlots:t._u([{key:"actions",fn:function(){return[n("router-link",{staticClass:"btn btn-icon close",attrs:{to:{name:"deck"},"aria-label":"Close"}},[n("i",{staticClass:"UI-icon UI-close-alt icon-small"})])]},proxy:!0},{key:"header",fn:function(){return[n("h3",[t._v(t._s(t.$t("about.title")))])]},proxy:!0},{key:"body",fn:function(){return[n("article",[t._l(t.$t("about.description"),(function(e,a){return n("p",{key:"p-"+a},[t._v(" "+t._s(e)+" ")])})),n("p",[t.displayInstallApp?n("button",{staticClass:"btn btn-large",attrs:{"aria-label":t.$t("install-app")},on:{click:function(e){return e.preventDefault(),t.installApp(e)}}},[t._v(" "+t._s(t.$t("install-app"))+" ")]):t._e()])],2)]},proxy:!0},{key:"footer",fn:function(){return[n("p",[t._v(t._s(t.$t("about.version"))+" "+t._s(t.version))])]},proxy:!0}])})},i=[],s=n("5530"),o=n("2f62"),c=n("b814"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"panel",appear:""}},[n("div",{staticClass:"panel-mask"},[n("div",{staticClass:"panel-wrapper"},[n("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.close,expression:"close"}],staticClass:"panel-container"},[n("div",{staticClass:"actions"},[t._t("actions")],2),n("div",{staticClass:"panel-header"},[t._t("header")],2),n("div",{staticClass:"panel-body"},[t._t("body")],2),n("div",{staticClass:"panel-footer"},[t._t("footer")],2)])])])])},r=[],u=n("2b0e"),p=n("c7db"),d=u["default"].extend({name:"Panel",mixins:[p["mixin"]],methods:{close(){this.$emit("close")}}}),f=d,v=(n("a19c"),n("2877")),b=Object(v["a"])(f,l,r,!1,null,"3190fb1f",null),m=b.exports,_=n("9224"),y={name:"About",metaInfo:{title:"About"},components:{Panel:m},data(){return{version:_["a"],installApp:c["a"]}},computed:Object(s["a"])({},Object(o["f"])(["displayInstallApp"]))},k=y,x=(n("ee65"),Object(v["a"])(k,a,i,!1,null,"18e8d458",null));e["default"]=x.exports}}]);
//# sourceMappingURL=about.347bae11.js.map