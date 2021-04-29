import axios from '@/utils/request.js'

// 获取文章列表
export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}