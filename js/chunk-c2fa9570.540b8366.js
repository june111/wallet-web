(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c2fa9570"],{"0df1":function(t,e,a){},2621:function(t,e){e.f=Object.getOwnPropertySymbols},5898:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{ref:"dataForm",staticClass:"block-form form",attrs:{model:t.dataForm,"label-position":"left",rules:t.rules}},[a("el-form-item",{attrs:{label:"name",prop:"name"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name","string"===typeof e?e.trim():e)},expression:"dataForm.name"}})],1),a("el-form-item",{attrs:{label:"password",prop:"password"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.dataForm.password,callback:function(e){t.$set(t.dataForm,"password","string"===typeof e?e.trim():e)},expression:"dataForm.password"}})],1),"keystore"!==t.activeName?a("el-form-item",{attrs:{label:"password again",prop:"checkPass"}},[a("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:t.dataForm.checkPass,callback:function(e){t.$set(t.dataForm,"checkPass","string"===typeof e?e.trim():e)},expression:"dataForm.checkPass"}})],1):t._e(),"create"!==t.activeName&&"keystore"!==t.activeName?a("el-form-item",{attrs:{label:t.contentLabel,prop:"content"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:t.dataForm.content,callback:function(e){t.$set(t.dataForm,"content","string"===typeof e?e.trim():e)},expression:"dataForm.content"}})],1):t._e(),"keystore"===t.activeName?a("el-form-item",{attrs:{label:t.contentLabel,prop:"content"}},[a("div",{staticClass:"el-upload el-upload--text",attrs:{tabindex:"0"}},[a("button",{staticClass:"el-button el-button--primary el-button--small btn-upload",attrs:{type:"button"},on:{change:t.loadTextFromFile}},[a("span",[t._v("点击上传")])]),a("input",{staticClass:"el-upload__input",attrs:{type:"file",name:"file",multiple:"multiple"}})])]):t._e(),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("dataForm")}}},[t._v("提交")])],1)],1)},r=[],n=(a("f751"),a("9468")),s=a("ca00"),c={props:{activeName:{type:String,required:!0}},data:function(){var t=this,e=function(e,a,o){""===a?o(new Error("请再次输入密码")):a!==t.dataForm.password?o(new Error("两次输入密码不一致!")):o()},a=function(e,a,o){""===a?o(new Error("请输入"+t.activeName)):"mnemonic"!==t.activeName||Object(n["g"])(a)?"privateKey"!==t.activeName||Object(n["f"])(a)?o():o(new Error("请输入有效私钥")):o(new Error("请输入有效助记词"))};return{dataForm:{name:"",content:"",password:"",checkPass:""},rules:{name:[{required:!0,trigger:"blur"}],content:[{required:!0,trigger:"blur",validator:a}],password:[{required:!0,trigger:"blur"}],checkPass:[{required:!0,trigger:"blur",validator:e}]}}},computed:{contentLabel:function(){return this.activeName}},methods:{submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var a=Object.assign({},e.dataForm);delete a["checkPass"];var o=10;Object(s["b"])(a["password"],o).then(function(t){a["password"]=t,e.$emit("dataForm",a)}),e.$router.push({path:"/token"})})},loadTextFromFile:function(t){var e=this,a=t.target.files[0],o=new FileReader;o.onload=function(t){e.dataForm.content=t.target.result,console.log("load",t.target.result)},o.readAsText(a)}}},i=c,l=(a("9b75"),a("0c7c")),m=Object(l["a"])(i,o,r,!1,null,null,null);m.options.__file="form.vue";e["a"]=m.exports},7333:function(t,e,a){"use strict";var o=a("0d58"),r=a("2621"),n=a("52a7"),s=a("4bf8"),c=a("626a"),i=Object.assign;t.exports=!i||a("79e5")(function(){var t={},e={},a=Symbol(),o="abcdefghijklmnopqrst";return t[a]=7,o.split("").forEach(function(t){e[t]=t}),7!=i({},t)[a]||Object.keys(i({},e)).join("")!=o})?function(t,e){var a=s(t),i=arguments.length,l=1,m=r.f,u=n.f;while(i>l){var f,p=c(arguments[l++]),d=m?o(p).concat(m(p)):o(p),b=d.length,v=0;while(b>v)u.call(p,f=d[v++])&&(a[f]=p[f])}return a}:i},"7f7f":function(t,e,a){var o=a("86cc").f,r=Function.prototype,n=/^\s*function ([^ (]*)/,s="name";s in r||a("9e1e")&&o(r,s,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},"8fc9":function(t,e,a){"use strict";var o=a("0df1"),r=a.n(o);r.a},"9b75":function(t,e,a){"use strict";var o=a("a4c8"),r=a.n(o);r.a},a4c8:function(t,e,a){},bfb1:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"create-wallet"},[a("h1",[t._v("恢复身份")]),a("el-tabs",{model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"助记词",name:"mnemonic"}},[a("data-form",{attrs:{activeName:t.activeName},on:{dataForm:t.dataForm}})],1),a("el-tab-pane",{attrs:{label:"私钥",name:"privateKey"}},[a("data-form",{attrs:{activeName:t.activeName},on:{dataForm:t.dataForm}})],1),a("el-tab-pane",{attrs:{label:"keystore",name:"keystore"}},[a("data-form",{attrs:{activeName:t.activeName},on:{dataForm:t.dataForm}})],1)],1)],1)},r=[],n=(a("7f7f"),a("5898")),s=a("9468"),c={name:"restorewallet",components:{dataForm:n["a"]},beforeCreate:function(){document.getElementsByTagName("body")[0].className="bg-create"},data:function(){return{activeName:"mnemonic",postForm:{}}},mounted:function(){},methods:{dataForm:function(t){this.postForm=t;var e={name:t.name,password:t.password};this.$store.commit("setAccount",e),this.restoreAccount()},restoreAccount:function(){"mnemonic"===this.activeName&&this.restoreFromMnemonic(),"privateKey"===this.activeName&&this.restoreFromPrvkey(),"keystore"===this.activeName&&this.restoreFromKeystore()},restoreFromMnemonic:function(){var t=this.postForm.content,e={};e=new s["a"](t,"60","0").account,e.mnemonic=t,console.log("wallet",e),this.$store.commit("setWallet",e)},restoreFromPrvkey:function(){var t=this.postForm.content,e=Object(s["b"])(t);console.log("wallet",e),this.$store.commit("setWallet",e)},restoreFromKeystore:function(){var t=this.postForm.content,e=this.postForm.password,a=Object(s["c"])(t,e),o=Object(s["b"])(a);console.log("wallet",o),this.$store.commit("setWallet",o)}}},i=c,l=(a("8fc9"),a("0c7c")),m=Object(l["a"])(i,o,r,!1,null,null,null);m.options.__file="restorewallet.vue";e["default"]=m.exports},f751:function(t,e,a){var o=a("5ca1");o(o.S+o.F,"Object",{assign:a("7333")})}}]);
//# sourceMappingURL=chunk-c2fa9570.540b8366.js.map