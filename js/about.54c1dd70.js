(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{4007:function(t,e,a){},"50a3":function(t,e,a){"use strict";a("afa2")},"714b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.close,expression:"close"}],staticClass:"modal-container"},[a("div",{staticClass:"actions"},[t._t("actions")],2),a("div",{staticClass:"modal-header"},[t._t("header")],2),a("div",{staticClass:"modal-body"},[t._t("body")],2),a("div",{staticClass:"modal-footer"},[t._t("footer")],2)])])])])},o=[],i=a("2b0e"),s=a("c7db"),c=i["default"].extend({name:"Modal",mixins:[s["mixin"]],methods:{close(){this.$emit("close")}}}),l=c,r=(a("50a3"),a("2877")),u=Object(r["a"])(l,n,o,!1,null,"0daffdc0",null);e["a"]=u.exports},9224:function(t){t.exports=JSON.parse('{"a":"1.5.2-beta"}')},afa2:function(t,e,a){},be53:function(t,e,a){"use strict";a("4007")},c7db:function(t,e,a){"use strict";var n=a("2b0e");n="default"in n?n["default"]:n;var o="2.2.2",i=/^2\./.test(n.version);i||n.util.warn("VueClickaway "+o+" only supports Vue 2.x, and does not support Vue "+n.version);var s="_vue_clickaway_handler";function c(t,e,a){l(t);var n=a.context,o=e.value;if("function"===typeof o){var i=!1;setTimeout((function(){i=!0}),0),t[s]=function(e){var a=e.path||(e.composedPath?e.composedPath():void 0);if(i&&(a?a.indexOf(t)<0:!t.contains(e.target)))return o.call(n,e)},document.documentElement.addEventListener("click",t[s],!1)}}function l(t){document.documentElement.removeEventListener("click",t[s],!1),delete t[s]}var r={bind:c,update:function(t,e){e.value!==e.oldValue&&c(t,e)},unbind:l},u={directives:{onClickaway:r}};e.version=o,e.directive=r,e.mixin=u},f820:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("modal",{on:{close:function(e){return t.$router.push({name:"deck"})}},scopedSlots:t._u([{key:"actions",fn:function(){return[a("router-link",{staticClass:"btn btn-icon close",attrs:{to:{name:"deck"},"aria-label":"Close"}},[a("i",{staticClass:"UI-icon UI-close-alt icon-small"})])]},proxy:!0},{key:"header",fn:function(){return[a("h3",[t._v(t._s(t.$t("about.title")))])]},proxy:!0},{key:"body",fn:function(){return[a("article",[t._l(t.$t("about.description"),(function(e,n){return a("p",{key:"p-"+n},[t._v(" "+t._s(e)+" ")])})),a("p",[t.displayInstallApp?a("button",{staticClass:"btn btn-large",attrs:{"aria-label":t.$t("install-app")},on:{click:function(e){return e.preventDefault(),t.installApp(e)}}},[t._v(" "+t._s(t.$t("install-app"))+" ")]):t._e(),t.isAuthenticated?a("button",{staticClass:"btn btn-large danger",attrs:{"aria-label":"Log out"},on:{click:function(e){return e.preventDefault(),t.logoutHandler(e)}}},[t._v(" "+t._s(t.$t("auth.logout"))+" ")]):t._e()])],2)]},proxy:!0},{key:"footer",fn:function(){return[a("p",[t._v(t._s(t.$t("about.version"))+" "+t._s(t.version))])]},proxy:!0}])})},o=[],i=a("5530"),s=a("2f62"),c=a("b814"),l=a("714b"),r=a("9224"),u={name:"About",metaInfo:{title:"About"},components:{Modal:l["a"]},data(){return{version:r["a"],installApp:c["a"]}},computed:Object(i["a"])(Object(i["a"])({},Object(s["f"])(["displayInstallApp"])),Object(s["d"])(["isAuthenticated"])),methods:Object(i["a"])(Object(i["a"])({},Object(s["c"])(["logout"])),{},{logoutHandler(){this.$toasted.show(this.$t("auth.not-authenticated.toast").toString(),{position:"bottom-center",duration:1500,type:"info"}),this.logout()}})},d=u,f=(a("be53"),a("2877")),p=Object(f["a"])(d,n,o,!1,null,"3dbf71c5",null);e["default"]=p.exports}}]);
//# sourceMappingURL=about.54c1dd70.js.map