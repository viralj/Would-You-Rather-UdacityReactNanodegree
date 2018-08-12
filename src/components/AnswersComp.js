import React, {Component} from 'react'
import {connect} from 'react-redux'

import Question from './Question'

class AnswerComp extends Component {
    render() {
        const {optionText, onClick, isActive, answered} = this.props;

        return (
            <button
                onClick={onClick}
                className={`btn ${ isActive ? 'active' : 'inactive' } ${ answered && 'nohover' }`}>
                {optionText}
            </button>
        )
    }
}

class AnsweredComp extends Component {
    render() {
        const {filteredQuestions} = this.props;

        return (
            <ul>
                {filteredQuestions.map(id => (
                    <li key={id}>
                        <Question id={id}/>
                    </li>
                ))}
            </ul>
        )
    }
}

function mapStateToProps({authenticatedUser, questions, users}) {
    const questionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const user = (authenticatedUser && users.hasOwnProperty(authenticatedUser))
        ? users[authenticatedUser]
        : {answers: {}};

    const filteredQuestions = questionIds.filter(id => user.answers.hasOwnProperty(id));

    return {
        filteredQuestions
    }
}

class AnswersComp extends Component {
    render() {
        const {
            optionOneText,
            optionTwoText,
            onClickOptionOne,
            onClickOptionTwo,
            optionOneVotes,
            optionTwoVotes,
            activeOption,
            answered
        } = this.props;

        const isActive = option => option === activeOption;

        return (
            <div className='answers'>
                <div className='answer-area'>
                    <AnswerComp
                        onClick={onClickOptionOne}
                        optionText={optionOneText}
                        isActive={isActive('optionOne')}
                        answered={answered}/>
                    {answered &&
                    <p>{optionOneVotes} ({Math.round((100 * optionOneVotes / (optionOneVotes + optionTwoVotes)))} %)</p>}
                </div>
                <h3>or</h3>
                <div className='answer-area'>
                    <AnswerComp
                        onClick={onClickOptionTwo}
                        optionText={optionTwoText}
                        isActive={isActive('optionTwo')}
                        answered={answered}/>
                    {answered &&
                    <p>{optionTwoVotes} ({Math.round((100 * optionTwoVotes / (optionOneVotes + optionTwoVotes)))} %)</p>}
                </div>
            </div>
        )
    }
}



export const Answer = AnswerComp;
export const Answers = AnswersComp;
export const Answered = connect(mapStateToProps)(AnsweredComp);