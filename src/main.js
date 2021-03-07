import Vue from 'vue'
import App from './App.vue'
// 导入路由包
import router from './router/index.js'
// 导入ui包
import MintUI from 'mint-ui'
// 导入ui包的css包
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 导入axios包
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://www.barteam.cn:8086/'
// 请求体中的数据会以普通表单形式（键值对）发送到后端
// axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded';
// Vue.config.productionTip = false
// 导入moment.js
// 格式化日期的过滤器
import moment from 'moment'
// 过滤器
/* 第一个参数为过滤器的名字
第二个参数为函数，函数中的第一个参数为需要格式化的字符串，第二个参数为格式化的样式
*/
Vue.filter('dateFormat',function(dateStr, pattern='YYYY--MM--DD HH:MM') {
  return moment(dateStr).format(pattern)
})
// 导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 导入store
import store from './store/index.js'



new Vue({
  render: h => h(App),
  router,
  store,
  MintUI
}).$mount('#app')
