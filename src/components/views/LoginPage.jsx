import React from "react";
import { Link } from "react-router-dom";
import RenderResponse from "../RenderResponse";
import axios from "axios";
import { baseUrl } from "../custom_modules/api_config";

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            response: null,
            email: '',
            password: '',
            laoding: false
        }
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
    }

    handle_change(event){
        switch (event.target.id) {
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

    handle_submit(event){
        event.preventDefault();
        this.setState({loading: true});

        var data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);
        var p = this;
        axios.post(baseUrl+'/login', data).then(function(response){
            p.setState({response: response.data, loading: false});
            p.handleResponse();
        }).catch(function(error){
            if(error.response){
                p.setState({response: error.response.data, loading: false});
                p.handleResponse();
            } else if(error.request){
                console.log(error);
                alert(error.message);
                p.setState({loading: false});
            } else {
                alert(error.message);
                p.setState({loading: false});
            }
        });
    }

    handleResponse(){
        var response = this.state.response;
        if(response){
            if(response.success){
                sessionStorage.setItem('api_token', response.data);
                this.props.history.push('/');
            }
        }
    }

    render(){
        var response = this.state.response;
        return(
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Login</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.email} id="email" type="email" className="validate" />
                                <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.password} id="password" type="password" className="validate" />
                                <label htmlFor="password">Create Password</label>
                            </div>
                            <button className="btn">Login</button>
                        </div>
                    </form>
                    <RenderResponse isLoading={this.state.loading} response={response} />
                </div>
                <div className="card-action">
                    <Link to="/" className="btn">Exit</Link>
                </div>
            </div>
        );
    }
}

export default LoginPage;