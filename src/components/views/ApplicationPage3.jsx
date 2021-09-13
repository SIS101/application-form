import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';
import M from 'materialize-css/dist/js/materialize';

class ApplicationPage3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admission_type: '',
            first_choice: '',
            second_choice: '',
            third_choice: '',
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
                    admission_type: this.application.data.admission_type,
                    first_choice: this.application.data.first_choice,
                    second_choice: this.application.data.second_choice,
                    third_choice: this.application.data.third_choice
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
        data.append('admission_type', this.state.admission_type);
        data.append('first_choice', this.state.first_choice);
        data.append('second_choice', this.state.second_choice);
        data.append('third_choice', this.state.third_choice);

        var p = this;
        axios.post(baseUrl+'/application/three?api_token='+this.auth, data).then(function(response){
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
                this.props.history.push('/page/4');
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
            case 'admission_type':
                this.setState({admission_type: event.target.value})
                break;
            case 'first_choice':
                this.setState({first_choice: event.target.value})
                break;
            case 'second_choice':
                this.setState({second_choice: event.target.value})
                break;
            case 'third_choice':
                this.setState({third_choice: event.target.value})
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
                        <span className="card-title">Online Application Admission</span>
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
                    <span className="card-title">Online Application Admission</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.admission_type} id="admission_type" type="text" className="validate" required />
                                <label htmlFor="admission_type">Admission Type</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.first_choice} id="first_choice" type="text" className="validate" required />
                                <label htmlFor="first_choice">First Choice</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.second_choice} id="second_choice" type="text" className="validate" required />
                                <label htmlFor="second_choice">Second Choice</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.third_choice} id="third_choice" type="text" className="validate" required />
                                <label htmlFor="third_choice">Third Choice</label>
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

export default ApplicationPage3;