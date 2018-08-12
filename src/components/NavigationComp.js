import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

class NavigationButtonComp extends Component {
    render() {
        let title, link, alternativeLink;

        switch (this.props.page) {
            case 'add' : {
                title = 'Add question';
                link = `/add`;
                break
            }
            case 'unanswered' : {
                title = 'Unanswered questions';
                link = `/unanswered`;
                alternativeLink = `/question/`;
                break
            }
            case 'answered' : {
                title = 'Answered questions';
                link = `/answered`;
                break
            }
            case 'leaderboard' : {
                title = 'Leaderboard';
                link = `/leaderboard`;
                break
            }
            default : {
                title = 'Invalid link';
                link = `/NotFound`;
                break
            }
        }

        const active =
            (this.props.location.pathname === link)
            || (this.props.location.pathname.toLowerCase().includes(alternativeLink))
                ? 'active'
                : '';

        return (
            <li className='tab col s3'><Link className={`active ${active}`} to={link}>{title}</Link></li>
        )
    }
}

class NavigationBarComp extends Component {
    render() {

        return (
            <div className='row'>
                <div className='col s12'>
                    <ul className='tabs'>
                        <NavigationButton page={'add'}/>
                        <NavigationButton page={'unanswered'}/>
                        <NavigationButton page={'answered'}/>
                        <NavigationButton page={'leaderboard'}/>
                    </ul>
                </div>
            </div>
        )
    }
}

export const NavigationBar = NavigationBarComp;
export const NavigationButton = withRouter(NavigationButtonComp);
