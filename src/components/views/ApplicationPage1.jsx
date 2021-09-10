import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';

class ApplicationPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            date_of_birth: '',
            place_of_birth: '',
            nationality: '',
            gender: '',
            marital_status: '',
            national_id_or_passport: '',
            response: false,
            loading: false
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
        this.setState({
            first_name: this.application.data.first_name,
            last_name: this.application.data.last_name,
            date_of_birth: this.application.data.date_of_birth,
            place_of_birth: this.application.data.place_of_birth,
            nationality: this.application.data.nationality,
            gender: this.application.data.gender,
            marital_status: this.application.data.marital_status,
            national_id_or_passport: this.application.data.national_id_or_passport
        });
    }

    componentDidMount(){
        this.getApplication();
    }

    handle_submit(event){
        event.preventDefault();
        this.setState({loading: true});
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('first_name', this.state.first_name);
        data.append('last_name', this.state.last_name);
        data.append('date_of_birth', this.state.date_of_birth);
        data.append('place_of_birth', this.state.place_of_birth);
        data.append('nationality', this.state.nationality);
        data.append('gender', this.state.gender);
        data.append('marital_status', this.state.marital_status);
        data.append('national_id_or_passport', this.state.national_id_or_passport);

        var p = this;
        axios.post(baseUrl+'/application/one?api_token='+this.auth, data).then(function(response){
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
                this.props.history.push('/page/2');
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
            case 'first_name':
                this.setState({first_name: event.target.value})
                break;
            case 'last_name':
                this.setState({last_name: event.target.value})
                break;
            case 'date_of_birth':
                this.setState({date_of_birth: event.target.value})
                break;
            case 'place_of_birth':
                this.setState({place_of_birth: event.target.value})
                break;
            case 'nationality':
                this.setState({nationality: event.target.value})
                break;
            case 'gender':
                this.setState({gender: event.target.value})
                break;
            case 'marital_status':
                this.setState({marital_status: event.target.value})
                break;
            case 'national_id_or_passport':
                this.setState({national_id_or_passport: event.target.value})
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
                        <span className="card-title">Online Application Personal Information</span>
                        <Link className="btn" to='/login'>Login</Link>
                    </div>
                    <div className="card-action">
                    <Link className="btn" to="/">Exit</Link>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Online Application Personal Information</span>
                        <form onSubmit={this.handle_submit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.first_name} id="first_name" type="text" className="validate" />
                                    <label htmlFor="first_name">First Name</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.last_name} id="last_name" type="text" className="validate" />
                                    <label htmlFor="last_name">Last Name</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.date_of_birth} id="date_of_birth" type="date" className="validate" />
                                    <label htmlFor="date_of_birth">Date of Birth</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.place_of_birth} id="place_of_birth" type="text" className="validate" />
                                    <label htmlFor="place_of_birth">Place of Birth</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.nationality} id="nationality" type="text" className="validate" />
                                    <label htmlFor="nationality">Nationality</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.gender} id="gender" type="text" className="validate" />
                                    <label htmlFor="gender">Gender</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.marital_status} id="marital_status" type="text" className="validate" />
                                    <label htmlFor="marital_status">Marital Status</label>
                                </div>
                                <div className="input-field col s12">
                                    <input onChange={this.handle_change} value={this.state.national_id_or_passport} id="national_id_or_passport" type="text" className="validate" />
                                    <label htmlFor="national_id_or_passport">National ID or Passport</label>
                                </div>
                                <button className="btn">Proceed</button>
                            </div>
                        </form>
                        <RenderResponse isLoading={this.state.loading} response={response} />
                    </div>
                    <div className="card-action">
                    <Link className="btn" to="/">Exit</Link>
                    </div>
                </div>
            );
        }
    }
}

export default ApplicationPage1;