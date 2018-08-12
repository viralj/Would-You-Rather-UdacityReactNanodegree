import {showLoading, hideLoading} from "react-redux-loading"

import {saveUser} from '../utils/APIHandler'


function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}


export const ADD_USER = 'ADD_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function handleAddUser(id, name, avatarURL) {
    return dispatch => {
        dispatch(showLoading());

        return saveUser({
            id,
            name,
            avatarURL
        })
            .then(user => dispatch(addUser(user)))
            .catch(errorMessage => {
                alert(`An error occurred: ${errorMessage}`);
            })
            .finally(() => dispatch(hideLoading()))
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}