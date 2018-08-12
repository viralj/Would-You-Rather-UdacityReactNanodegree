import {SET_AUTHENTICATED_USER, UNSET_AUTHENTICATED_USER} from '../actions/authenticateUser'

export default function authenticatedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHENTICATED_USER :
            return action.id;
        case UNSET_AUTHENTICATED_USER :
            return null;
        default :
            return state
    }
}
