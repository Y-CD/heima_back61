import Vue from 'vue'
import App from './App.vue'

// 引入样式
import './styles/index.less'

// 引入路由
import router from '@/router/index.js'

// 全局引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
