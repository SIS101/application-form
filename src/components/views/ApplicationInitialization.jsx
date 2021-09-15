import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';

class ApplicationInitialization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);

        this.response = null;
    }
    handle_submit(event){
        event.preventDefault();
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('username', this.state.username);
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        var p = this;
        this.setState({loading: true});
        axios.post(baseUrl+'/application', data).then(function(response){
            p.response = response.data;
            p.setState({loading: false});
            p.handleResponse();
        }).catch(function(error){
            if(error.response){
                p.response = error.response.data;
                p.setState({loading: false});
                p.handleResponse();
            } else if(error.request){
                alert(error.message);
                p.setState({loading: false});
            } else {
                alert(error.message);
                p.setState({loading: false});
            }
        });
    }

    handleResponse(){
        if(this.response){
            if(this.response.success){
                sessionStorage.setItem('api_token', this.response.data);
                this.props.history.push('/');
            }
        }
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
        var response = this.response;
        return(
            <div className="card indigo-text darken-4">
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
                            <button className="btn indigo darken-4">Proceed</button>
                        </div>
                    </form>
                    <RenderResponse isLoading={this.loading} response={response} />
                </div>
                <div className="card-action">
                <Link className="btn indigo darken-4" to="/">Exit</Link>
                </div>
            </div>
        );
    }
}

export default ApplicationInitialization;