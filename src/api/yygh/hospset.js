import request from '@/utils/request'
const api_name = '/admin/hosp/hospitalSet/'
export default {
    // 带条件的分页查询
    pageQuery(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'POST',
            data: searchObj// 使用json方式传递
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    }, save(hospset) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: hospset
        })
    }, getById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get',
            data: id
        })
    },
    updateById(hospset) {
        return request({
            url: `${api_name}/updateHospSet`,
            method: 'post',
            data: hospset
        })
    }
    ,removeRows(idList) {
        return request({
            url: `${api_name}/batchRemove`,
            method: 'POST',
            data: idList
        })
    }

}