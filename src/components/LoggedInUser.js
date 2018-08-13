import React, { Component } from 'react'
import { connect } from 'react-redux'

import { unsetAuthenticatedUser } from '../actions/authenticateUser'

class LoggedInUser extends Component {
    render() {
        const { userName, loggedIn, avatarURL, logout } = this.props;

        return (
            <div>

                {loggedIn &&

                <div className='user'>
                    <p>Hello <strong>{userName}</strong>!</p>
                    <div
                        className='user-avatar tiny'
                        style={{
                            backgroundImage: `url(${avatarURL})`
                        }}/>
                    <a className='right-align logout_link' onClick={logout}>Logout</a>
                </div>

                }
            </div>

        )
    }
}

function mapStateToProps({ authenticatedUser, users }) {
    let userName, loggedIn = false, avatarURL;
    if ( authenticatedUser !== null && users.hasOwnProperty(authenticatedUser) ) {
        userName = users[authenticatedUser].name;
        loggedIn = true;
        avatarURL = users[authenticatedUser].avatarURL
    } else {
        userName = 'there';
        avatarURL = 'https://yt3.ggpht.com/a-/ACSszfFg07TedGfMeHnsRM-YB0ZXSt79sWgDFgqvNg=s900-mo-c-c0xffffffff-rj-k-no'
    }

    return {
        userName,
        loggedIn,
        avatarURL
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(unsetAuthenticatedUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUser)