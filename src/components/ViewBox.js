import React, {Component} from 'react'

class ViewBox extends Component {
    render() {
        const {title, avatarURL} = this.props;

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card-panel white">
                        <div className='row'>
                            <div className='col s4'>
                                <img className='responsive-img' src={`${avatarURL}`} />
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

export default ViewBox
