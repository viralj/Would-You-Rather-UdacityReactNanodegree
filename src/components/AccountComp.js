import React, {Component} from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {setAuthenticatedUser} from '../actions/authenticateUser'
import {handleAddUser} from '../actions/users'

import {Answers} from './AnswersComp'
import {ViewBox} from './ViewBoxComp'

class AASignUp extends Component {
    state = {
        id: '',
        name: '',
        avatarURL: ''
    };

    handleSubmit = e => {
        e.preventDefault();

        const {id, name, avatarURL} = this.state;
        const {onRegister} = this.props;

        onRegister(id, name, avatarURL)
    };

    handleChange = e => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState(() => ({
            [name]: text
        }))
    };

    render() {
        const {id, name, avatarURL} = this.state;

        return (
            <div className='col s8'>
                <form onSubmit={this.handleSubmit} className='col s12' autoComplete='off'>
                    <div className='row'>
                        <div className="input-field col s12">
                            <input
                                className='validate'
                                value={id}
                                onChange={this.handleChange}
                                name='id'
                                id='id'
                                type='text'
                            />
                            <label htmlFor="id">Username (JohnDoe)</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="input-field col s12">
                            <input
                                className='validate'
                                value={name}
                                onChange={this.handleChange}
                                name='name'
                                id='name'
                                type='text'/>
                            <label htmlFor="name">Name (John Doe)</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="input-field col s12">
                            <input
                                className='validate'
                                value={avatarURL}
                                onChange={this.handleChange}
                                name='avatarURL'
                                id='avatarURL'
                                type='text'/>
                            <label htmlFor="avatarURL">Avatar URL (http://url.link/image.jpeg)</label>
                        </div>
                    </div>
                    <div className='row'>
                        <button
                            type='submit'
                            value='Register'
                            className='btn red'>Register
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


class AALogin extends Component {
    state = {
        view: 'initial',
        redirect: false,
        from : {}
    };

    optionOneText = 'Log in';
    optionTwoText = 'Sign up';

    handleSignInClick = () => {
        this.setState(() => ({
            view: 'signin'
        }))
    };

    handleSignUpClick = () => {
        this.setState(() => ({
            view: 'signup'
        }))
    };

    setInitialState = () => {
        this.setState(() => ({
            view: 'initial'
        }))
    };

    handleLogin = user => {
        this.props.login(user);
        this.setState(() => ({
            redirect: true
        }))
    };

    handleRegister = (id, name, avatarURL) => {
        this.props.createAccount(id, name, avatarURL);
        this.setState(() => ({
            redirect: true
        }));
        this.props.login(id)
    };

    loginOption = view => {
        switch (view) {
            case 'signin' :
                return (
                    <div className='login-area'>
                        <div
                            className='arrow-back'
                            onClick={() => this.setInitialState()}/>
                        <SignIn
                            onLogin={user => this.handleLogin(user)}/>
                    </div>
                );
            case 'signup' :
                return (
                    <div className='login-area'>
                        <div
                            className='arrow-back'
                            onClick={() => this.setInitialState()}/>
                        <SignUp
                            onRegister={(id, name, avatarURL) => this.handleRegister(id, name, avatarURL)}/>
                    </div>
                );
            case 'initial' :
                return (
                    <Answers
                        optionOneText={this.optionOneText}
                        onClickOptionOne={this.handleSignInClick}
                        optionTwoText={this.optionTwoText}
                        onClickOptionTwo={this.handleSignUpClick}/>
                );
            default : {
                this.setInitialState();

                return <Redirect to='/login'/>
            }
        }
    };

    render() {
        const {view, redirect} = this.state;

        const {from} = {from: {pathname: '/unanswered'}};

        if (redirect === true) {
            if(this.props.location.state && this.props.location.state.from.pathname){
                return <Redirect to={this.props.location.state.from.pathname}/>
            }else{
                return <Redirect to={from}/>
            }

        }

        const viewName = 'login_view';
        const title = 'Login or Sign up to play `Would you rather?`';
        const avatarURL = 'http://www.makstudios.co.uk/images/avatar4.png';

        return (
            <div className='row'>
                <div className='col s12 center'>
                    <h3>Hello there!</h3>
                </div>
                <ViewBox
                    viewName={viewName}
                    title={title}
                    avatarURL={avatarURL}>
                    {this.loginOption(view)}
                </ViewBox>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: user => {
            dispatch(setAuthenticatedUser(user))
        },
        createAccount: (id, name, avatarURL) => {
            dispatch(handleAddUser(id, name, avatarURL))
        }
    }
}

class AASignIn extends Component {
    render() {
        const {users, onLogin} = this.props;
        return (
            <div className="input-field col s12">
                <select
                    className="browser-default"
                    onChange={event => onLogin(event.target.value)}
                    defaultValue='default'>
                    <option
                        disabled
                        value='default'>
                        Choose user
                    </option>
                    {Object.keys(users).map(user => (
                        <option
                            key={users[user].id}
                            value={users[user].id}>
                            {users[user].name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users: users
            ? users
            : {}
    }
}

export const Login = connect(null, mapDispatchToProps)(AALogin);
export const SignIn = connect(mapStateToProps)(AASignIn);
export const SignUp = AASignUp;
