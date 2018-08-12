import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer, _saveUser} from './_DATA'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestion(question) {
    return _saveQuestion(question)
}

export function saveQuestionAnswer(question) {
    return _saveQuestionAnswer(question)
}

export function saveUser(user) {
    return _saveUser(user)
}
