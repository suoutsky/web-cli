import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


class Dataquery extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }
    render(){
        return (
            <div>
                12222
            </div>
        )
    }
}

export default Dataquery;

