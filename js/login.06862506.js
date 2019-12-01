(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"50a3":function(t,e,a){"use strict";var r=a("afa2"),n=a.n(r);n.a},"714b":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:t.close,expression:"close"}],staticClass:"modal-container"},[a("div",{staticClass:"actions"},[t._t("actions")],2),a("div",{staticClass:"modal-header"},[t._t("header")],2),a("div",{staticClass:"modal-body"},[t._t("body")],2),a("div",{staticClass:"modal-footer"},[t._t("footer")],2)])])])])},n=[],o=a("2b0e"),s=a("c7db"),i=o["default"].extend({name:"Modal",mixins:[s["mixin"]],methods:{close(){this.$emit("close")}}}),c=i,u=(a("50a3"),a("2877")),l=Object(u["a"])(c,r,n,!1,null,"0daffdc0",null);e["a"]=l.exports},a407:function(t,e,a){},a55b:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("modal",{on:{close:t.close},scopedSlots:t._u([{key:"actions",fn:function(){return[a("button",{staticClass:"btn btn-icon close",attrs:{"aria-label":"Close"},on:{click:t.close}},[a("i",{staticClass:"UI-icon UI-close-alt icon-small"})])]},proxy:!0},{key:"header",fn:function(){return[t.isAuthenticated?a("h1",[t._v(" "+t._s(t.$t("auth.success.title"))+" ")]):a("h1",[t._v(" "+t._s(t.$t("auth.not-authenticated.title"))+" ")])]},proxy:!0},{key:"body",fn:function(){return[a("form",{class:{danger:t.authError},on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.login(e)}}},[a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.username,expression:"username",modifiers:{trim:!0}}],staticClass:"inpt inpt-large inpt-bg",attrs:{id:"username",placeholder:t.$t("auth.username"),"aria-label":t.$t("auth.username"),type:"text",name:"username",autocomplete:"username",required:""},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"inpt inpt-large inpt-bg",attrs:{id:"password",placeholder:t.$t("auth.password"),"aria-label":t.$t("auth.password"),type:"password",name:"password",autocomplete:"password",required:""},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("button",{staticClass:"btn btn-large",attrs:{"aria-label":"Submit",type:"submit"}},[t._v(" "+t._s(t.$t("submit"))+" ")])])]},proxy:!0},{key:"footer",fn:function(){return[a("p",[t._v(t._s(t.$t("auth.cookies")))])]},proxy:!0}])})},n=[],o=(a("25f0"),a("2532"),a("1da1")),s=a("ade3"),i=a("2b0e"),c=a("714b"),u=a("2f62");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var p=i["default"].extend({name:"Login",metaInfo:{title:"Login"},components:{Modal:c["a"]},data(){return{username:"",password:"",authError:!1}},computed:d({},Object(u["f"])(["credentials"]),{},Object(u["d"])(["isAuthenticated"])),methods:d({},Object(u["c"])(["authenticate"]),{login(){var t=this;return Object(o["a"])((function*(){if(t.username.includes("@afp.com"))return t.$toasted.show(t.$t("auth.warning-email").toString(),{position:"bottom-center",duration:1500,type:"error"}),t.authError=!0,!1;try{yield t.authenticate({username:t.username,password:t.password}),t.$toasted.show(t.$t("auth.success.title").toString(),{position:"bottom-center",duration:1500,type:"success"}),t.authError=!1,t.$ga.enable();var e=t.$route.query.redirect;if(e)if(Array.isArray(e)){var a=e[0];a&&t.$router.push({path:a})}else t.$router.push({path:e});else t.$router.push({name:"deck"})}catch(r){t.authError=!0}}))()},close(){this.$ga.enable(),this.$router.push({name:"deck"})}})}),m=p,f=(a("ecb1"),a("2877")),b=Object(f["a"])(m,r,n,!1,null,"57769280",null);e["default"]=b.exports},afa2:function(t,e,a){},c7db:function(t,e,a){"use strict";var r=a("2b0e");r="default"in r?r["default"]:r;var n="2.2.2",o=/^2\./.test(r.version);o||r.util.warn("VueClickaway "+n+" only supports Vue 2.x, and does not support Vue "+r.version);var s="_vue_clickaway_handler";function i(t,e,a){c(t);var r=a.context,n=e.value;if("function"===typeof n){var o=!1;setTimeout((function(){o=!0}),0),t[s]=function(e){var a=e.path||(e.composedPath?e.composedPath():void 0);if(o&&(a?a.indexOf(t)<0:!t.contains(e.target)))return n.call(r,e)},document.documentElement.addEventListener("click",t[s],!1)}}function c(t){document.documentElement.removeEventListener("click",t[s],!1),delete t[s]}var u={bind:i,update:function(t,e){e.value!==e.oldValue&&i(t,e)},unbind:c},l={directives:{onClickaway:u}};e.version=n,e.directive=u,e.mixin=l},ecb1:function(t,e,a){"use strict";var r=a("a407"),n=a.n(r);n.a}}]);
//# sourceMappingURL=login.06862506.js.map