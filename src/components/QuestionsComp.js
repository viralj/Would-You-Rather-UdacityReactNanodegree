import React, {Component} from 'react'
import {connect} from 'react-redux'

import {handleAnswerQuestion, handleAddQuestion} from '../actions/questions'

import {Answers} from './AnswersComp'
import {ViewBox} from './ViewBoxComp'
import AskForm from './AskForm'

class AddQuestionComp extends Component {
    render() {
        const {authenticated, avatarURL, addQuestion} = this.props;

        const viewName = 'addquestion';
        const title = 'Would you rather?';

        let handleAddQuestion = () => {
        };
        if (authenticated) {
            handleAddQuestion = addQuestion
        }

        return (
            <div className='row'>
                <ViewBox
                    viewName={viewName}
                    title={title}
                    avatarURL={avatarURL}>
                    <AskForm handleAddQuestion={handleAddQuestion}/>
                </ViewBox>
            </div>
        )
    }
}

function mapAddQuestionStateToProps({users, authenticatedUser}) {
    const authenticated = !!authenticatedUser;

    const avatarURL = users.hasOwnProperty(authenticatedUser)
        ? users[authenticatedUser].avatarURL
        : '';

    return {
        authenticated,
        avatarURL
    }
}

function mapAddQuestionDispatchToProps(dispatch) {
    return {
        addQuestion: (optionOneText, optionTwoText) => {
            dispatch(handleAddQuestion(optionOneText, optionTwoText))
        }
    }
}


class QuestionComp extends Component {
    render() {
        const {optionOneText, optionTwoText, optionOneVotes, optionTwoVotes, user, id, avatarURL, answerQuestion} = this.props;

        let onClickOptionOne, onClickOptionTwo, activeOption, answered = false;
        if (user && user.hasOwnProperty('answers')) {
            if (user.answers.hasOwnProperty(id)) {
                activeOption = user.answers[id];
                answered = true
            } else {
                onClickOptionOne = () => answerQuestion(id, 'optionOne');
                onClickOptionTwo = () => answerQuestion(id, 'optionTwo')
            }
        }

        const viewName = 'question';
        const title = 'Would you rather?';

        return (
            <ViewBox
                viewName={viewName}
                title={title}
                avatarURL={avatarURL}>
                <Answers
                    optionOneText={optionOneText}
                    optionTwoText={optionTwoText}
                    onClickOptionOne={onClickOptionOne}
                    onClickOptionTwo={onClickOptionTwo}
                    optionOneVotes={optionOneVotes}
                    optionTwoVotes={optionTwoVotes}
                    activeOption={activeOption}
                    answered={answered}/>
            </ViewBox>
        )
    }
}

function mapStateToProps({users, questions, authenticatedUser}, {id}) {
    let optionOne, optionTwo, optionOneText = '', optionTwoText = '', optionOneVotes = '', optionTwoVotes = '';
    if (questions.hasOwnProperty(id)) {
        optionOne = questions[id].optionOne;
        optionTwo = questions[id].optionTwo;
        optionOneText = optionOne.text;
        optionTwoText = optionTwo.text;
        optionOneVotes = Object.keys(optionOne.votes).length;
        optionTwoVotes = Object.keys(optionTwo.votes).length
    }

    const user = users.hasOwnProperty(authenticatedUser)
        ? users[authenticatedUser]
        : null;

    const author = questions.hasOwnProperty(id)
        ? questions[id].author
        : '';

    const avatarURL = users.hasOwnProperty(author)
        ? users[author].avatarURL
        : '';

    return {
        optionOneText,
        optionTwoText,
        optionOneVotes,
        optionTwoVotes,
        user,
        id,
        avatarURL
    }
}

function mapDispatchToProps(dispatch) {
    return {
        answerQuestion: (qid, answer) => {
            dispatch(handleAnswerQuestion(qid, answer))
        }
    }
}

export const Question =  connect(mapStateToProps, mapDispatchToProps)(QuestionComp);
export const AddQuestion = connect(mapAddQuestionStateToProps, mapAddQuestionDispatchToProps)(AddQuestionComp);
