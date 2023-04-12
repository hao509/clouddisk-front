// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import * as Echarts from "echarts";
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
axios.defaults.withCredentials=true;
import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'  
const Base64 = require('js-base64').Base64

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(Echarts);
Vue.use(VueParticles);
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
Vue.prototype.$axios = axios


// // 路由拦截
// router.beforeEach((to, from, next) => {
//   let isLogin = localStorage.getItem("nameUser")
//   if(isLogin){
//     next()
//   }else{
//     if(to.path ==="/login"){
//       next()
//     }else{
//       alert("没有访问权限或者登录过期，请重新登录")
//       next("/login")
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  Base64
})
