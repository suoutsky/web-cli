import axios from 'axios';

export const getItemDatas = params => axios.get(`/riskExample/queryPage`, params).then(res => res.data);
