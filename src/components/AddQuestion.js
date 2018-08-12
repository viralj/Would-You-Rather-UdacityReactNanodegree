import React, {Component} from 'react'
import {connect} from 'react-redux'

import {handleAddQuestion} from '../actions/questions'

import AskForm from './AskForm'
import ViewBox from './ViewBox'

class AddQuestion extends Component {
    render() {
        const {authenticated, avatarURL, addQuestion} = this.props;

        const viewName = 'addquestion';
        const title = 'Would you rather?';

        let handleAddQuestion = () => {
        };
        if (authenticated) {
            handleAddQuestion = addQuestion
        }

        return (
            <div className='row'>
                <ViewBox
                    viewName={viewName}
                    title={title}
                    avatarURL={avatarURL}>
                    <AskForm handleAddQuestion={handleAddQuestion}/>
                </ViewBox>
            </div>
        )
    }
}

function mapStateToProps({users, authenticatedUser}) {
    const authenticated = !!authenticatedUser;

    const avatarURL = users.hasOwnProperty(authenticatedUser)
        ? users[authenticatedUser].avatarURL
        : '';

    return {
        authenticated,
        avatarURL
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: (optionOneText, optionTwoText) => {
            dispatch(handleAddQuestion(optionOneText, optionTwoText))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)
