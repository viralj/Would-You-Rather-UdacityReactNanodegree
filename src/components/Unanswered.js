import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import Question from './Question'
import SmallQuestion from './SmallQuestion'

class Unanswered extends Component {
    render() {
        const {filteredQuestions, questionId, history} = this.props;

        return (
            <div>
                {filteredQuestions.map(id => (
                    <div className='row'
                        key={id}>
                        {id === questionId
                            ? <Question id={id}/>
                            : <SmallQuestion
                                id={id}
                                onClick={() => history.push(`/question/${id}`)}
                            />}
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({authenticatedUser, questions, users}, props) {
    const {id} = props.match.params;

    const questionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const user = (authenticatedUser && users.hasOwnProperty(authenticatedUser))
        ? users[authenticatedUser]
        : {answers: {}};

    const filteredQuestions = questionIds.filter(id => !user.answers.hasOwnProperty(id));

    return {
        filteredQuestions,
        questionId: id
    }
}

export default withRouter(connect(mapStateToProps)(Unanswered))
