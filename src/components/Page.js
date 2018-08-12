import React, {Component} from 'react'

import {NavigationBar} from './NavigationComp'
import ViewPage from './ViewPage'

class Page extends Component {
    render() {
        return (
            <div>
                <div className='container'>
                    <NavigationBar/>
                </div>
                <div className='container'>
                    <ViewPage/>
                </div>
            </div>
        )
    }
}

export default Page
