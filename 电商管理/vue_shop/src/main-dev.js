import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//导入nprogress包对应的js和css

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'

//配置请求跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//在request拦截器中展示进度条 NProgress.start()
axios.interceptors.request.use(config=>{
  // console.log(config)
  NProgress.start()
  //在最后必须return config
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//在response拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config=>{
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

// 全局定义 格式化时间过滤器
Vue.filter('dateFormat',function(originVal){
   const dt = new Date(originVal)
   const y =dt.getFullYear()
   const m = (dt.getMonth() + 1 + '').padStart(2,'0')
   const d = (dt.getDate()  + '').padStart(2,'0')
   const hh = (dt.getHours()  + '').padStart(2,'0')
   const mm = (dt.getMinutes()  + '').padStart(2,'0')
   const ss = (dt.getSeconds()  + '').padStart(2,'0')
   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
