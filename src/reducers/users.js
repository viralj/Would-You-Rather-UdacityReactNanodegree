import {ADD_USER, RECEIVE_USERS} from '../actions/users'
import {ADD_QUESTION, ANSWER_QUESTION, DELETE_ANSWER_QUESTION} from '../actions/questions'


export default function users(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION : {
            const {id, author} = action.question;

            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id])
                }
            }
        }
        case ADD_USER :
            return {
                ...state,
                [action.user.id]: action.user
            };
        case ANSWER_QUESTION : {
            const {user, qid, answer} = action;

            return {
                ...state,
                [user]: {
                    ...state[user],
                    answers: {
                        ...state[user].answers,
                        [qid]: answer
                    }
                }
            }
        }
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            };
        default :
            return state
    }
}

