import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

class AskForm extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    };

    handleChange = e => {
        const name = e.target.name;
        const text = e.target.value;
        this.setState(() => ({
            [name]: text
        }))
    };

    handleSubmit = e => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {handleAddQuestion} = this.props;

        handleAddQuestion(optionOneText, optionTwoText);

        this.setState(() => ({
            toHome: true
        }))
    };

    render() {
        const {optionOneText, optionTwoText, toHome} = this.state;

        if (toHome === true) {
            return <Redirect to='/unanswered'/>
        }

        return (
            <form className='col s12' onSubmit={this.handleSubmit} autoComplete='off'>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input
                            value={optionOneText}
                            onChange={this.handleChange}
                            name='optionOneText'
                            className='validate'
                            id='optionOneText'
                            type='text'
                            required/>
                        <label htmlFor="optionOneText">First option</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s12'>
                        <input
                            value={optionTwoText}
                            onChange={this.handleChange}
                            name='optionTwoText'
                            className='validate'
                            id='optionTwoText'
                            type='text'
                            required/>
                        <label htmlFor="optionTwoText">Second option</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s4'>
                        <button className='btn blue'>Add options</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AskForm
