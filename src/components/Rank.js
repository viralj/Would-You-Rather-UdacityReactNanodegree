import React, {Component} from 'react'

import RankCounter from './RankCounter'

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
