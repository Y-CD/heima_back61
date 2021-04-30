import axios from '@/utils/request.js'

// 获取文章列表
export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}

// 发布文章
export const publishPost = (data) => {
    return axios({
        method: 'post',
        url: '/post',
        data
    })
}