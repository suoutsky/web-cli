import './index.less'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


class Knowledge extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return (
          <div className="page-knowledge">
            <iframe src="http://cf.dui88.com/pages/viewpage.action?pageId=7684198" frameBorder="0"></iframe>
          </div>
        )
    }
}

export default Knowledge;
