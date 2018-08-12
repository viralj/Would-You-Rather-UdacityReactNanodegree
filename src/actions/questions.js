import {showLoading, hideLoading} from 'react-redux-loading'

import {receiveUsers} from './users'
import {getInitialData, saveQuestion, saveQuestionAnswer} from '../utils/APIHandler'


function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function answerQuestion({user, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        user,
        qid,
        answer
    }
}

function deleteAnswerQuestion({user, qid, answer}) {
    return {
        type: DELETE_ANSWER_QUESTION,
        user,
        qid,
        answer
    }
}

export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const DELETE_ANSWER_QUESTION = 'DELETE_ANSWER_QUESTION';

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authenticatedUser} = getState();

        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authenticatedUser
        })
            .then(question => dispatch(addQuestion(question)))
            .finally(() => dispatch(hideLoading()))
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const {authenticatedUser} = getState();

        dispatch(showLoading());
        dispatch(answerQuestion({user: authenticatedUser, qid, answer}));

        return saveQuestionAnswer({
            authenticatedUser,
            qid,
            answer
        })
            .catch(() => dispatch(deleteAnswerQuestion({user: authenticatedUser, qid, answer})))
            .finally(() => dispatch(hideLoading()))
    }
}

export function handleInitialData() {
    return dispatch => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading())
            })
    }
}

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}
