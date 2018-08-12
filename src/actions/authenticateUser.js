export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';
export const UNSET_AUTHENTICATED_USER = 'UNSET_AUTHENTICATED_USER';

export function setAuthenticatedUser(id) {
  return {
    type: SET_AUTHENTICATED_USER,
    id
  }
}

export function unsetAuthenticatedUser() {
  return {
    type: UNSET_AUTHENTICATED_USER
  }
}
