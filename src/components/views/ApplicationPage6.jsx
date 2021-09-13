import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';
import M from 'materialize-css/dist/js/materialize';

class ApplicationPage6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            next_of_kin_full_name: '',
            next_of_kin_email: '',
            next_of_kin_phone: '',
            next_of_kin_province: '',
            next_of_kin_town: '',
            next_of_kin_physical_address: '',
            next_of_kin_postal_address: '',
            response: false
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);

        this.auth = sessionStorage.getItem('api_token') || null;
        this.response = null;
        this.application = null;
    }

    getApplication(){
        var p = this;
        p.setState({loading: true});
        axios.get(baseUrl+'/application/get?api_token='+this.auth).then(function(response){
            p.application = response.data;
            p.setState({response: true,loading: false});
            p.loadApplication();
        }).catch(function(error){
            if(error.response){
                p.application = error.response.data;
                p.setState({response: true,loading: false});
                p.setState({loading: false});
            } else if(error.request){
                alert(error.message);
                p.setState({loading: false});
            } else {
                alert(error.message);
                p.setState({loading: false});
            }
        });
    }

    loadApplication(){
        if(this.application){
            if(this.application.success){
                this.setState({
                    next_of_kin_full_name: this.application.data.next_of_kin_full_name,
                    next_of_kin_email: this.application.data.next_of_kin_email,
                    next_of_kin_phone: this.application.data.next_of_kin_phone,
                    next_of_kin_province: this.application.data.next_of_kin_province,
                    next_of_kin_town: this.application.data.next_of_kin_town,
                    next_of_kin_physical_address: this.application.data.next_of_kin_physical_address,
                    next_of_kin_postal_address: this.application.data.next_of_kin_postal_address
                });
            }
        }
    }

    componentDidMount(){
        this.getApplication();
        M.updateTextFields();
    }

    handle_submit(event){
        event.preventDefault();
        this.setState({loading: true});
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('next_of_kin_full_name', this.state.next_of_kin_full_name);
        data.append('next_of_kin_email', this.state.next_of_kin_email);
        data.append('next_of_kin_phone', this.state.next_of_kin_phone);
        data.append('next_of_kin_province', this.state.next_of_kin_province);
        data.append('next_of_kin_town', this.state.next_of_kin_town);
        data.append('next_of_kin_physical_address', this.state.next_of_kin_physical_address);
        data.append('next_of_kin_postal_address', this.state.next_of_kin_postal_address);

        var p = this;
        axios.post(baseUrl+'/application/six?api_token='+this.auth, data).then(function(response){
            p.setState({response: true, loading: false});
            p.response = response.data;
            p.handleResponse();
        }).catch(function(error){
            if(error.response){
                p.response = error.response.data;
                p.setState({response: true, loading: false});
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
        var response = this.response;
        if(response){
            if(response.success){
                alert(response.message);
                this.props.history.push('/review');
            } else {
                if(typeof(response.message) == 'object'){
                    var message = "";
                    for(const [key, value] of Object.entries(response.message)){
                        message += `${key}: ${value}`;
                    }
                    alert(message);
                }
            }
        }
    }

    handle_change(event){
        switch (event.target.id) {
            case 'next_of_kin_full_name':
                this.setState({next_of_kin_full_name: event.target.value})
                break;
            case 'next_of_kin_email':
                this.setState({next_of_kin_email: event.target.value})
                break;
            case 'next_of_kin_phone':
                this.setState({next_of_kin_phone: event.target.value})
                break;
            case 'next_of_kin_province':
                this.setState({next_of_kin_province: event.target.value})
                break;
            case 'next_of_kin_town':
                this.setState({next_of_kin_town: event.target.value})
                break;
            case 'next_of_kin_physical_address':
                this.setState({next_of_kin_physical_address: event.target.value})
                break;
            case 'next_of_kin_postal_address':
                this.setState({next_of_kin_postal_address: event.target.value})
                break;
            default:
                break;
        }
    }

    render(){
        var response = this.state.response;
        if(this.auth === null){
            return(
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Online Application Adress</span>
                        <Link className="btn" to='/login'>Login</Link>
                    </div>
                    <div className="card-action">
                    <Link className="btn" to="/">Exit</Link>
                    </div>
                </div>
            );
        }
        return(
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Online Application Next Of Kin</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_full_name} id="next_of_kin_full_name" type="text" className="validate" required />
                                <label htmlFor="next_of_kin_full_name">Next of kin full name</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_email} id="next_of_kin_email" type="email" className="validate" />
                                <label htmlFor="next_of_kin_email">Next of kin email</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_phone} id="next_of_kin_phone" type="tel" className="validate" required />
                                <label htmlFor="next_of_kin_phone">Next of kin Phone</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_province} id="next_of_kin_province" type="text" className="validate" required />
                                <label htmlFor="next_of_kin_province">Next of kin Province</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_town} id="next_of_kin_town" type="text" className="validate" required />
                                <label htmlFor="next_of_kin_town">Next of kin Town</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_physical_address} id="next_of_kin_physical_address" type="text" className="validate" required />
                                <label htmlFor="next_of_kin_physical_address">Next of kin Physical Address</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.next_of_kin_postal_address} id="next_of_kin_postal_address" type="text" className="validate" />
                                <label htmlFor="next_of_kin_postal_address">Next of kin Postal Address</label>
                            </div>
                            <button className="btn">Proceed</button>
                        </div>
                    </form>
                    <RenderResponse isLoading={this.state.loading} response={response} />
                </div>
                <div className="card-action">
                <Link className="btn" to="/">Back</Link>
                </div>
            </div>
        );
    }
}

export default ApplicationPage6;