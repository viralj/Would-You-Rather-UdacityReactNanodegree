import React, {Component} from 'react'
import {connect} from 'react-redux'

import Rank from './Rank'
import ViewBox from './ViewBox'

class User extends Component {
    render() {
        const {user, questionCount, answerCount} = this.props;

        const viewName = 'user';
        const title = user.name;
        const avatarURL = user.avatarURL;

        return (
            <ViewBox
                viewName={viewName}
                title={title}
                avatarURL={avatarURL}>
                <Rank
                    questionCount={questionCount}
                    answerCount={answerCount}/>
            </ViewBox>
        )
    }
}

function mapStateToProps({users}, {id}) {
    const user = users[id];
    return {
        user
    }
}

export default connect(mapStateToProps)(User)
