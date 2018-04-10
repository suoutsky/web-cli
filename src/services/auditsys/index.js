import axios from 'axios';
// 处理人
export const getDeals = params => axios.get('/riskReview/findAdminsReview', params).then(res => res.data);
// 列表数据
export const getItemDatas = params => axios.get('/riskReview/queryPage', {params: params}).then(res => res.data);
// 获取操作日志
export const getChangeLogs = params => axios.get('/riskReview/queryReviewHisList', {params: params}).then(res => res.data);
// 获取作弊等级事件
export const queryCountShows = params => axios.get('/riskReview/queryCountShow', {params: params}).then(res => res.data);
// 添加案例
export const addCases = params => axios.post('/riskReview/addOrUpdate', params).then(res => res.data);
// 查询历史处理列表
export const getReviewResultList = params => axios.get('/riskReview/handleRecord', {params: params}).then(res => res.data);
