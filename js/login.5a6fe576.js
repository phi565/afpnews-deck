(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"0332":function(e,t,a){"use strict";a("bdbb")},a1c4:function(e,t,a){},a55b:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("modal",{staticClass:"on-left header-out",scopedSlots:e._u([{key:"header",fn:function(){return[s("img",{attrs:{src:a("5365")}})]},proxy:!0},{key:"body",fn:function(){return[s("form",{class:{danger:e.authError},on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.login(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.username,expression:"username",modifiers:{trim:!0}}],staticClass:"inpt inpt-large inpt-bg",attrs:{id:"username",placeholder:e.$t("auth.username"),"aria-label":e.$t("auth.username"),type:"text",name:"username",autocomplete:"username",required:""},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.password,expression:"password",modifiers:{trim:!0}}],staticClass:"inpt inpt-large inpt-bg",attrs:{id:"password",placeholder:e.$t("auth.password"),"aria-label":e.$t("auth.password"),type:"password",name:"password",autocomplete:"password",required:""},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),s("select",{directives:[{name:"model",rawName:"v-model",value:e.lang,expression:"lang"}],staticClass:"inpt inpt-large inpt-bg select",attrs:{required:""},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.lang=t.target.multiple?a:a[0]}}},[s("option",{attrs:{value:"none",selected:"",disabled:""}},[e._v("Langue des articles")]),e._l(e.languages,(function(t){var a=t.label,n=t.value,r=t.disabled;return s("option",{key:n.join("|"),attrs:{disabled:r},domProps:{value:n}},[e._v(" "+e._s(a)+" ")])}))],2),s("button",{staticClass:"btn btn-large",attrs:{"aria-label":"Submit",type:"submit"}},[e._v(" "+e._s(e.$t("submit"))+" ")])])]},proxy:!0}])})},n=[],r=(a("ddb0"),a("5530")),i=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.close,expression:"close"}],staticClass:"modal-container"},[a("div",{staticClass:"actions"},[e._t("actions")],2),a("div",{staticClass:"modal-header"},[e._t("header")],2),a("div",{staticClass:"modal-body"},[e._t("body")],2),a("div",{staticClass:"modal-footer"},[e._t("footer")],2)])])])])},l=[],u=a("c7db"),d=i["default"].extend({name:"Modal",mixins:[u["mixin"]],methods:{close(){this.$emit("close")}}}),c=d,m=(a("0332"),a("2877")),p=Object(m["a"])(c,o,l,!1,null,"25b9b722",null),b=p.exports,g=a("2f62"),h=a("049b"),f=a("ec26"),v=a("5593"),w=i["default"].extend({name:"Login",metaInfo:{title:"Login"},components:{Modal:b},data(){return{username:"",password:"",lang:"none",authError:!1}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(g["f"])(["credentials"])),Object(g["d"])(["isAuthenticated"])),{},{languages(){return[{label:this.$t("languages.en"),value:["en"],disabled:!1},{label:this.$t("languages.fr"),value:["fr"],disabled:!1},{label:this.$t("languages.de"),value:["de"],disabled:!1},{label:this.$t("languages.es"),value:["es"],disabled:!1},{label:this.$t("languages.pt"),value:["pt"],disabled:!1},{label:this.$t("languages.ar"),value:["ar"],disabled:!1},{label:this.$t("languages.zh-tw"),value:["zh-tw"],disabled:!1},{label:this.$t("languages.zh-cn"),value:["zh-cn"],disabled:!1}]}}),methods:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(g["c"])(["authenticate"])),Object(g["e"])(["resetAllColumns","addColumn"])),{},{async login(){if(this.username.includes("@afp.com"))return this.$toasted.show(this.$t("auth.warning-email").toString(),{position:"bottom-center",duration:1500,type:"error"}),this.authError=!0,!1;try{if(await this.authenticate({username:this.username,password:this.password}),this.$toasted.show(this.$t("auth.success.title").toString(),{position:"bottom-center",duration:1500,type:"success"}),this.authError=!1,this.$ga.enable(),"none"!==this.lang){const e=v[this.lang];for(const t of e)if(t.default){const e={id:Object(f["a"])(),params:Object.assign({},h["a"].defaultSearchParams,{products:["multimedia"],topics:t.value,langs:this.lang,size:4,sources:["afp","AFPTV","AFP Vidéographie","AFP Videographics","AFP Vidéographic","AFPTV / AFP Videografik"]}),documentsIds:[]};this.addColumn(e)}}this.$router.push({name:"deck"})}catch(e){this.authError=!0}}}),mounted(){const e=Math.floor(5*Math.random())+1,t="background-"+e,a=document.querySelector(".modal-mask");a.style.backgroundImage="url('img/background/"+t+".jpg')"}}),$=w,y=(a("e645"),Object(m["a"])($,s,n,!1,null,"5f95d876",null));t["default"]=y.exports},bdbb:function(e,t,a){},e645:function(e,t,a){"use strict";a("a1c4")}}]);
//# sourceMappingURL=login.5a6fe576.js.map