import React, {Component} from 'react'
import {connect} from 'react-redux'

import {SmallViewBox} from './ViewBoxComp'

class SmallQuestion extends Component {
    render() {
        const {onClick, avatarURL} = this.props;

        const title = 'Would you rather?';

        return (
            <SmallViewBox
                onClick={onClick}
                title={title}
                avatarURL={avatarURL}/>
        )
    }
}

function mapStateToProps({users, questions}, {id}) {
    const author = questions.hasOwnProperty(id)
        ? questions[id].author
        : '';

    const avatarURL = users.hasOwnProperty(author)
        ? users[author].avatarURL
        : '';

    return {
        avatarURL
    }
}

export default connect(mapStateToProps)(SmallQuestion)
