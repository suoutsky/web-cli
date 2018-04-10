// 路由配置
module.exports = {
  get: {
    '/riskReview/queryPage': '/json/auditsys/riskReviewQueryPage.json',
    '/riskReview/findAdminsReview': '/json/auditsys/deal.json',
    '/riskReview/queryReviewHisList': '/json/auditsys/log.json',
    '/riskReview/queryCountShow': '/json/auditsys/queryCountShow.json',
    '/riskReview/handleRecord': '/json/auditsys/handleRecord.json'
  },
  post: {
    '/riskReview/addOrUpdate': '/json/auditcase/addcase.json'
  }
};
