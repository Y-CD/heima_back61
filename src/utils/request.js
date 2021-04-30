// 这是配置axios的文件
import axios from 'axios'

// 配置axios的baseURL
axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // 在发送请求之前做些什么
    // 添加 Authorization: localStorage.getItem('heimatoutiao_token')
    let token = localStorage.getItem('heima_back61_token');
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 暴露
export default axios