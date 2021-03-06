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
        },
        {
            name: 'index',
            path: '/index',
            component: () => import('@/views/index.vue'),
            // 登录到首页重定向到 显示欢迎的页面
            redirect: { name: 'hello' },
            // 使用嵌套路由
            children: [
                {
                    name: 'hello',
                    path: 'hello',
                    component: () => import('@/views/hello.vue')
                },
                {
                    name: 'postList',
                    path: 'postList',
                    component: () => import('@/views/postList.vue')
                },
                {
                    name: 'postPublish',
                    path: 'postPublish',
                    component: () => import('@/views/postPublish.vue')
                }
            ]
        }
    ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // 判断 如果是登录页 就直接去
    if (to.path == '/login') {
        next()
    } else {
        let token = localStorage.getItem('heima_back61_token')
        // 判断有没有登录
        if (token) {
            next()
        } else {
            next({ name: 'login' })
        }
    }

})

// 暴露
export default router