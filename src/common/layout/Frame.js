import './Frame.less';
import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import NotFound from './404';
import Dataquery from '../../containers/Dataquery';
import Knowledge from '../../containers/Knowledge';

const { Header, Sider, Content } = Layout;

class Frame extends Component {
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      collapsed: false,
      title: '元数据管理系统'
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      title: this.state.collapsed ? '元数据管理系统' : '元数据'
    });
  }
  render() {
    return (
      <div className="components-layout-custom-trigger">
         <Router>
          <Layout style={{height: '100%'}}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo" >{this.state.title}</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <Icon type="user" />
                  <span>
                    <Link to="/Dataquery">数据查询</Link>
                  </span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="file-text" />
                  <span>SQL管理</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="edit" />
                  <span>标签管理</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="file-word" />
                  <span>
                    <Link to="/Knowledge">业务知识管理</Link>
                  </span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                  {/* <Route path="/" component={Frame}> */}
                    {/* <IndexRoute component={Dataquery}/> */}
                    <Route path="/Dataquery" component={Dataquery}/>
                    <Route path="/Knowledge" component={Knowledge}/>
                    {/* <Route path="*" component={NotFound}/> */}
                  {/* </Route> */}
              </Content>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default Frame;
