import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
import { getTables } from '../../../action';
// import { dataquery } from '../../../reducers';

import { Form, Row, Col, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Dataquery extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          db: 'kinlin'
        }
    }
    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.props, this.state);
      this.props.onClick(this.state);
    }
    render(){
        return (
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSubmit} 
          >
            <Row gutter={24}>
              <Col span={8} >
                <FormItem label="库" >
                 <Select defaultValue={this.state.db} style={{ width: 120 }}>
                    <Option value="mysql">Jack</Option>
                    <Option value="innodb">Lucy</Option>
                    <Option value="kinlin">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8} >
                <FormItem label="创建人">
                 <Select defaultValue="lucy" style={{ width: 120 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8} >
                <FormItem label="关键词">
                  <Input placeholder="placeholder" />
                </FormItem>
              </Col>

            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // todos: getVisibleTodos(state, filter),
    // isFetching: getIsFetching(state, filter),
    // errorMessage: getErrorMessage(state, filter),
    // filter
  };
};

// 智能组件 传入props
const mapDispatchToProps =  {
  onClick: getTables
};
// ownProps.params   withRouter()获取路由里的属性
export default connect(mapStateToProps, mapDispatchToProps)(Dataquery)


