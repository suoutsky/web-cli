import auditcase from '@/pages/auditcase/index';
const auditCase = [
  {
    path: '/',
    redirect: '/auditcase',
    meta: {
      auth: true, // 是否需要认证
      title: '案例库',
      identify: '',
      sliderBar: false, // 侧边栏显示状态
      icon: 'icon-yewu'
    }
  },
  {
    path: '/auditcase',
    // name: 'dataIndex',
    component: auditcase,
    meta: {
      auth: true, // 是否需要认证
      title: '案例库',
      identify: '',
      sliderBar: true, // 侧边栏显示状态
      icon: 'icon-yewu'
    }
  }
];
export default auditCase;
