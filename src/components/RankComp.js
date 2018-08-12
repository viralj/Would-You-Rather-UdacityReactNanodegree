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

class Rank extends Component {
    render() {
        const {questionCount, answerCount} = this.props;

        return (
            <div className='user-scores'>
                <RankCounter
                    label='Questions asked'
                    score={questionCount}/>
                <RankCounter
                    label='Questions answered'
                    score={answerCount}/>
            </div>
        )
    }
}

export default Rank
