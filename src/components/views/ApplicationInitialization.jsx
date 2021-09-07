import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import SDK from '../custom_modules/ApplicationSDK';
import RenderResponse from '../RenderResponse';

class ApplicationInitialization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            response: null
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.sdk = new SDK();
    }
    handle_submit(event){
        event.preventDefault();
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('username', this.state.username);
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        var response = this.sdk.initializeApplication(data);
        this.setState({response: response})
    }
    handle_change(event){
        switch (event.target.id) {
            case 'username':
                this.setState({username: event.target.value})
                break;
            case 'email':
                this.setState({email: event.target.value})
                break;
            case 'password':
                this.setState({password: event.target.value})
                break;
            default:
                break;
        }
    }
    render(){
        var response = this.state.response;
        return(
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Online Application Initialization</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.username} id="username" type="text" className="validate" />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.email} id="email" type="email" className="validate" />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.password} id="password" type="password" className="validate" />
                                <label htmlFor="password">Create Password</label>
                            </div>
                            <button className="btn">Proceed</button>
                        </div>
                    </form>
                    <RenderResponse response={response} />
                </div>
                <div className="card-action">
                <Link className="btn" to="/">Exit</Link>
                </div>
            </div>
        );
    }
}

export default ApplicationInitialization;