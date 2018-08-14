import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Question} from './QuestionsComp'
import {withRouter} from 'react-router-dom'
import SmallQuestion from './SmallQuestion'
import ErrorPage from './ErrorPage'

class AnswerComp extends Component {
    render() {
        const {optionText, onClick} = this.props;

        return (
            <button
                onClick={onClick}
                className={`btn`}>
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

        let one, two;
        if (answered && isActive('optionOne')) {
            one = <p className='red-text'>Your answer</p>;
            two = <p>&nbsp;</p>;
        }
        else if (answered && isActive('optionTwo')) {
            one = <p>&nbsp;</p>;
            two = <p className='red-text'>Your answer</p>;
        }
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
                    {one}
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
                    {two}
                </div>
            </div>
        )
    }
}

class UnansweredComp extends Component {
    render() {
        const {filteredQuestions, questionId, history, user} = this.props;

        let page;

        if (Object.keys(user.answers).includes(questionId) || filteredQuestions.includes(questionId) || this.props.location.pathname.toString().toLowerCase() === "/unanswered".toLocaleLowerCase()) {
            page = <div>
                {filteredQuestions.map(id => (
                    <div className='row'
                         key={id}>
                        {id === questionId
                            ? <Question id={id}/>
                            : <SmallQuestion
                                id={id}
                                onClick={() => history.push(`/questions/${id}`)}
                            />}
                    </div>
                ))}
            </div>
        } else {
            page = <ErrorPage
                location={this.props.location}
            />
        }
        console.log(page);
        return (
            page
        )
    }
}

function mapStateToUnansweredCompProps({authenticatedUser, questions, users}, props) {
    const {id} = props.match.params;

    const questionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const user = (authenticatedUser && users.hasOwnProperty(authenticatedUser))
        ? users[authenticatedUser]
        : {answers: {}};

    const filteredQuestions = questionIds.filter(id => !user.answers.hasOwnProperty(id));
    // const filteredQuestions = questionIds;

    return {
        filteredQuestions,
        questionId: id,
        user: user
    }
}


export const Answer = AnswerComp;
export const Answers = AnswersComp;
export const Answered = connect(mapStateToProps)(AnsweredComp);
export const Unanswered = withRouter(connect(mapStateToUnansweredCompProps)(UnansweredComp));