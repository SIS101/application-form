import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';

class ApplicationPage5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results_transcript: '',
            nrc: '',
            passport_photo: '',
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
        data.append('results_transcript', this.state.results_transcript, this.state.results_transcript.name);
        data.append('nrc', this.state.nrc, this.state.nrc.name);
        data.append('passport_photo', this.state.passport_photo, this.state.passport_photo.name);

        var p = this;
        axios.post(baseUrl+'/application/five?api_token='+this.auth, data).then(function(response){
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
                this.props.history.push('/page/6');
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
            case 'results_transcript':
                this.setState({results_transcript: event.target.files[0]})
                break;
            case 'nrc':
                this.setState({nrc: event.target.files[0]})
                break;
            case 'passport_photo':
                this.setState({passport_photo: event.target.files[0]})
                break;
            default:
                break;
        }
    }

    render(){
        var response = this.state.response;
        if(this.auth === null){
            return(
                <div className="card indigo-text darken-4">
                    <div className="card-content">
                        <span className="card-title">Online Application Documents</span>
                        <Link className="btn indigo darken-4" to='/login'>Login</Link>
                    </div>
                    <div className="card-action">
                    <Link className="btn indigo darken-4" to="/">Exit</Link>
                    </div>
                </div>
            );
        }
        return(
            <div className="card indigo-text darken-4">
                <div className="card-content">
                    <span className="card-title">Online Application Documents</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field file-field col s12">
                                <div className="btn">
                                    <span>File</span>
                                    <input onChange={this.handle_change} id="results_transcript" type="file" required />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Results transcript" />
                                </div>
                            </div>
                            <div className="input-field file-field col s12">
                                <div className="btn">
                                    <span>File</span>
                                    <input onChange={this.handle_change} id="nrc" type="file" required />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="NRC" />
                                </div>
                            </div>
                            <div className="input-field file-field col s12">
                                <div className="btn">
                                    <span>File</span>
                                    <input onChange={this.handle_change} id="passport_photo" type="file" required />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder="Passport Photo" />
                                </div>
                            </div>
                            <button className="btn indigo darken-4">Proceed</button>
                        </div>
                    </form>
                    <RenderResponse isLoading={this.state.loading} response={response} />
                </div>
                <div className="card-action">
                <Link className="btn indigo darken-4" to="/">Back</Link>
                </div>
            </div>
        );
    }
}

export default ApplicationPage5;