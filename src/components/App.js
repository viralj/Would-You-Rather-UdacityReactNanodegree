import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router} from 'react-router-dom'

import {handleInitialData} from '../actions/questions'

import Page from './Page'
import TopBar from './TopBar'

class App extends Component {
    componentDidMount() {
        this.props.loadInitial()
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div>
                        <TopBar/>
                        <div className='row'>&nbsp;</div>
                        <Page/>
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadInitial: () => {
            dispatch(handleInitialData())
        }
    }
}

export default connect(null, mapDispatchToProps)(App)
