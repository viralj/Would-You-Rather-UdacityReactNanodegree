import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

class PrivateRoute extends Component {
    render() {
        const {component: Component, authenticated, path, ...rest} = this.props;

        return (
            <Route path={path} {...rest} render={props => (
                authenticated
                    ? <Component {...rest} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
            )}/>
        )
    }
}

function mapStateToProps({authenticatedUser}) {
    const authenticated = authenticatedUser !== null;

    return {
        authenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)
