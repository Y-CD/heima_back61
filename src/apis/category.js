import axios from '@/utils/request.js'

// 获取栏目列表
export const getCateList = () => {
    return axios({
        url: '/category'
    })
}