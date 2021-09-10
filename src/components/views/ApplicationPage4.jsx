import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';

class ApplicationPage4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondary_school_attended: '',
            english_language: '',
            mathematics: '',
            biology: '',
            science: '',
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
        data.append('secondary_school_attended', this.state.secondary_school_attended);
        data.append('english_language', this.state.english_language);
        data.append('mathematics', this.state.mathematics);
        data.append('biology', this.state.biology);
        data.append('science', this.state.science);

        var p = this;
        axios.post(baseUrl+'/application/four?api_token='+this.auth, data).then(function(response){
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
                this.props.history.push('/page/5');
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
            case 'secondary_school_attended':
                this.setState({secondary_school_attended: event.target.value})
                break;
            case 'english_language':
                this.setState({english_language: event.target.value})
                break;
            case 'mathematics':
                this.setState({mathematics: event.target.value})
                break;
            case 'biology':
                this.setState({biology: event.target.value})
                break;
            case 'science':
                this.setState({science: event.target.value})
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
                        <span className="card-title">Online Application Grade 12 Results</span>
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
                    <span className="card-title">Online Application Grade 12 Results</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.secondary_school_attended} id="secondary_school_attended" type="text" className="validate" required />
                                <label htmlFor="secondary_school_attended">Secondary School Results</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.english_language} id="english_language" type="text" className="validate" required />
                                <label htmlFor="english_language">English language</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.mathematics} id="mathematics" type="text" className="validate" required />
                                <label htmlFor="mathematics">Mathematics</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.biology} id="biology" type="text" className="validate" required />
                                <label htmlFor="biology">Biology</label>
                            </div>
                            <div className="input-field col s12">
                                <input onChange={this.handle_change} value={this.state.science} id="science" type="text" className="validate" required />
                                <label htmlFor="science">Science</label>
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

export default ApplicationPage4;