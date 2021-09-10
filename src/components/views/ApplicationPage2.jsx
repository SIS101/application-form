import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';

class ApplicationPage2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: '',
            town: '',
            physical_address: '',
            postal_address: '',
            phone: '',
            response: false
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);

        this.auth = sessionStorage.getItem('api_token') || null;
        this.response = null;
    }

    handle_submit(event){
        event.preventDefault();
        this.setState({loading: true});
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('province', this.state.province);
        data.append('town', this.state.town);
        data.append('physical_address', this.state.physical_address);
        data.append('postal_address', this.state.postal_address);
        data.append('phone', this.state.phone);

        var p = this;
        axios.post(baseUrl+'/application/two?api_token='+this.auth, data).then(function(response){
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
                this.props.history.push('/page/3');
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
            case 'province':
                this.setState({province: event.target.value})
                break;
            case 'town':
                this.setState({town: event.target.value})
                break;
            case 'physical_address':
                this.setState({physical_address: event.target.value})
                break;
            case 'postal_address':
                this.setState({postal_address: event.target.value})
                break;
            case 'phone':
                this.setState({phone: event.target.value})
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
                    <span className="card-title">Online Application Address</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.province} id="province" type="text" className="validate" required />
                                <label htmlFor="province">Province</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.town} id="town" type="text" className="validate" required />
                                <label htmlFor="town">Town</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.physical_address} id="physical_address" type="text" className="validate" required />
                                <label htmlFor="physical_address">Physical Address</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.postal_address} id="postal_address" type="text" className="validate" />
                                <label htmlFor="postal_address">Postal Address</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.phone} id="phone" type="tel" className="validate" required />
                                <label htmlFor="phone">Phone</label>
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

export default ApplicationPage2;