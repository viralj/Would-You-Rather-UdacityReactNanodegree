import React, {Component} from 'react'

class SmallViewBox extends Component {
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

export default SmallViewBox
