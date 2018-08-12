import React, {Component} from 'react'

class RankCounter extends Component {
    render() {
        const {label, score} = this.props;

        return (
            <div className='white z-depth-2 score-box'>
                <div className='score-label'>
                    {label}
                </div>
                <div className='score'>
                    {score}
                </div>
            </div>
        )
    }
}

export default RankCounter
