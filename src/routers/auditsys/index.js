import auditsys from '@/pages/auditsys/index';
const auditSys = [
  {
    path: '/',
    redirect: '/auditsys',
    meta: {
      auth: true, // 是否需要认证
      title: '审核操作台',
      identify: '',
      sliderBar: false, // 侧边栏显示状态
      icon: 'icon-shujuchaxun'
    }
  },
  {
    path: '/auditsys',
    name: 'dataIndex',
    component: auditsys,
    meta: {
      auth: true, // 是否需要认证
      title: '审核操作台',
      identify: '',
      sliderBar: true, // 侧边栏显示状态
      icon: 'icon-shujuchaxun'
    }
  }
];
export default auditSys;
