// 这个文件是路由管理的

// 工程化
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 创建和配置路由
const router = new VueRouter({
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/login.vue')
        }
    ]
})

// 暴露
export default router