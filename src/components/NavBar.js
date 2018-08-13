import React, {Component} from 'react'

import LoggedInUser from './LoggedInUser'

class NavBar extends Component {
    render() {
        return (
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="nav-wrapper">
                            <div className='col s5 left'>
                                <a href="" className="brand-logo">Would you rather?</a>
                            </div>
                            <div className='col s7 right-align'>
                                <LoggedInUser/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar
