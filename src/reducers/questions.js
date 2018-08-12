import {RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION, DELETE_ANSWER_QUESTION} from '../actions/questions'


export default function questions(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION :
            return {
                ...state,
                [action.question.id]: action.question
            };
        case ANSWER_QUESTION : {
            const {user, qid, answer} = action;

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([user])
                    }
                }
            }
        }
        case DELETE_ANSWER_QUESTION : {
            const {user, qid, answer} = action;

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.filter(answerer => answerer !== user)
                    }
                }
            }
        }
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            };
        default :
            return state
    }
}
