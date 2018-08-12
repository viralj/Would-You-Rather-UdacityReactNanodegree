import React, {Component} from 'react'
import {connect} from 'react-redux'

import User from './User'

class Leaderboard extends Component {
    countQuestions = id => {
        return this.props.users[id].questions.length
    };

    countAnswers = id => {
        return Object.keys(this.props.users[id].answers).length
    };

    totalScore = id => {
        return this.countQuestions(id) + this.countAnswers(id)
    };

    render() {
        const userIds = Object.keys(this.props.users).sort((a, b) => this.totalScore(b) - this.totalScore(a));

        return (
            <div>
                {userIds.map(id => (
                    <div
                        className='row'
                        key={id}>
                        <User
                            id={id}
                            questionCount={this.countQuestions(id)}
                            answerCount={this.countAnswers(id)}/>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: users
            ? users
            : {}
    }
}

export default connect(mapStateToProps)(Leaderboard)
