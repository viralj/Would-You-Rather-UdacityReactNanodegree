import React, {Component} from 'react'

class ViewBoxComp extends Component {
    render() {
        const {title, avatarURL} = this.props;

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card-panel white">
                        <div className='row'>
                            <div className='col s4'>
                                <img className='responsive-img' src={`${avatarURL}`}/>
                            </div>
                            <div className='col s8'>
                                <div className='row'>
                                    <h4>{title}</h4>
                                </div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SmallViewBoxComp extends Component {
    render() {
        const {onClick, title, avatarURL} = this.props;

        return (
            <div className='col s8 offset-s2 white' onClick={onClick}>
                <div className='row'>&nbsp;</div>
                <div className='row'>
                    <div className='col s4'>
                        <img className='responsive-img' src={`${avatarURL}`}/>
                    </div>
                    <div className='col s8 center'>
                        <h5>{title}</h5>
                    </div>
                </div>
                <div className='row'>&nbsp;</div>
            </div>
        )
    }
}

export const SmallViewBox = SmallViewBoxComp;

export const ViewBox = ViewBoxComp;
