import axios from 'axios';

// 列表数据
export const getItemDatas = params => axios.get('/riskExample/queryPage', {params: params}).then(res => res.data);

// 添加案例
export const addCases = params => axios.post('/riskExample/addOrUpdate', params).then(res => res.data);

// 删除案例
export const deleExamples = params => axios.get('/riskExample/deleExample', {params: params}).then(res => res.data);
