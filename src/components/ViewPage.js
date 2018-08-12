import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {AddQuestion} from './QuestionsComp'
import {Answered, Unanswered} from './AnswersComp'
import ErrorPage from './ErrorPage'
import Leaderboard from './Leaderboard'
import {Login} from './AccountComp'
import PrivateRoute from './PrivateRoute'

class ViewPage extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <Redirect to="/unanswered"/>
                        )}/>
                    <Route
                        path='/login'
                        component={Login}/>
                    <PrivateRoute
                        path='/add'
                        component={AddQuestion}/>
                    <PrivateRoute
                        path='/unanswered'
                        component={Unanswered}/>
                    <PrivateRoute
                        path='/question/:id'
                        component={Unanswered}/>
                    <PrivateRoute
                        path='/answered'
                        component={Answered}/>
                    <PrivateRoute
                        path='/leaderboard'
                        component={Leaderboard}/>
                    <Route
                        component={ErrorPage}/>
                </Switch>
            </div>
        )
    }
}

export default ViewPage
