(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{4007:function(t,e,n){},"50a3":function(t,e,n){"use strict";n("afa2")},"714b":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"modal"}},[n("div",{staticClass:"modal-mask"},[n("div",{staticClass:"modal-wrapper"},[n("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.close,expression:"close"}],staticClass:"modal-container"},[n("div",{staticClass:"actions"},[t._t("actions")],2),n("div",{staticClass:"modal-header"},[t._t("header")],2),n("div",{staticClass:"modal-body"},[t._t("body")],2),n("div",{staticClass:"modal-footer"},[t._t("footer")],2)])])])])},o=[],i=n("2b0e"),s=n("c7db"),c=i["default"].extend({name:"Modal",mixins:[s["mixin"]],methods:{close:function(){this.$emit("close")}}}),l=c,r=(n("50a3"),n("2877")),u=Object(r["a"])(l,a,o,!1,null,"0daffdc0",null);e["a"]=u.exports},9224:function(t){t.exports=JSON.parse('{"a":"1.5.2-beta"}')},afa2:function(t,e,n){},be53:function(t,e,n){"use strict";n("4007")},c7db:function(t,e,n){"use strict";var a=n("2b0e");a="default"in a?a["default"]:a;var o="2.2.2",i=/^2\./.test(a.version);i||a.util.warn("VueClickaway "+o+" only supports Vue 2.x, and does not support Vue "+a.version);var s="_vue_clickaway_handler";function c(t,e,n){l(t);var a=n.context,o=e.value;if("function"===typeof o){var i=!1;setTimeout((function(){i=!0}),0),t[s]=function(e){var n=e.path||(e.composedPath?e.composedPath():void 0);if(i&&(n?n.indexOf(t)<0:!t.contains(e.target)))return o.call(a,e)},document.documentElement.addEventListener("click",t[s],!1)}}function l(t){document.documentElement.removeEventListener("click",t[s],!1),delete t[s]}var r={bind:c,update:function(t,e){e.value!==e.oldValue&&c(t,e)},unbind:l},u={directives:{onClickaway:r}};e.version=o,e.directive=r,e.mixin=u},f820:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{on:{close:function(e){return t.$router.push({name:"deck"})}},scopedSlots:t._u([{key:"actions",fn:function(){return[n("router-link",{staticClass:"btn btn-icon close",attrs:{to:{name:"deck"},"aria-label":"Close"}},[n("i",{staticClass:"UI-icon UI-close-alt icon-small"})])]},proxy:!0},{key:"header",fn:function(){return[n("h3",[t._v(t._s(t.$t("about.title")))])]},proxy:!0},{key:"body",fn:function(){return[n("article",[t._l(t.$t("about.description"),(function(e,a){return n("p",{key:"p-"+a},[t._v(" "+t._s(e)+" ")])})),n("p",[t.displayInstallApp?n("button",{staticClass:"btn btn-large",attrs:{"aria-label":t.$t("install-app")},on:{click:function(e){return e.preventDefault(),t.installApp(e)}}},[t._v(" "+t._s(t.$t("install-app"))+" ")]):t._e(),t.isAuthenticated?n("button",{staticClass:"btn btn-large danger",attrs:{"aria-label":"Log out"},on:{click:function(e){return e.preventDefault(),t.logoutHandler(e)}}},[t._v(" "+t._s(t.$t("auth.logout"))+" ")]):t._e()])],2)]},proxy:!0},{key:"footer",fn:function(){return[n("p",[t._v(t._s(t.$t("about.version"))+" "+t._s(t.version))])]},proxy:!0}])})},o=[],i=(n("d3b7"),n("25f0"),n("5530")),s=n("2f62"),c=n("b814"),l=n("714b"),r=n("9224"),u={name:"About",metaInfo:{title:"About"},components:{Modal:l["a"]},data:function(){return{version:r["a"],installApp:c["a"]}},computed:Object(i["a"])(Object(i["a"])({},Object(s["f"])(["displayInstallApp"])),Object(s["d"])(["isAuthenticated"])),methods:Object(i["a"])(Object(i["a"])({},Object(s["c"])(["logout"])),{},{logoutHandler:function(){this.$toasted.show(this.$t("auth.not-authenticated.toast").toString(),{position:"bottom-center",duration:1500,type:"info"}),this.logout()}})},d=u,f=(n("be53"),n("2877")),p=Object(f["a"])(d,a,o,!1,null,"3dbf71c5",null);e["default"]=p.exports}}]);
//# sourceMappingURL=about-legacy.954fa9b9.js.map