import React from "react";
import M from 'materialize-css/dist/js/materialize';
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../custom_modules/api_config";

class Review extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }

        this.submitApplication = this.submitApplication.bind(this);

        this.auth = sessionStorage.getItem('api_token') || null;
        this.application = null;
        this.response = null;

    }

    getApplication(){
        var p = this;
        p.setState({loading: true});
        axios.get(baseUrl+'/application/get?api_token='+this.auth).then(function(response){
            p.response = response.data;
            p.setState({loading: false});
        }).catch(function(error){
            if(error.response){
                p.response = error.response.data;
                p.setState({loading: false});
            } else if(error.request){
                alert(error.message);
            } else {
                alert(error.message);
            }
        });
    }

    submitApplication(){
        var p = this;
        p.setState({loading: true});
        axios.get(baseUrl+'/application/submit?api_token='+this.auth).then(function(response){
            if(response.data.success){
                alert(response.data.message);
                p.setState({loading: false});
            } else {
                alert(response.data.message);
                p.setState({loading: false});
            }
        }).catch(function(error){
            if(error.response){
                alert(error.response.data.message);
                p.setState({loading: false});
            } else if(error.request){
                alert(error.message);
            } else {
                alert(error.message);
            }
        });
    }

    componentDidMount(){
        this.getApplication();
    }

    render(){
        if(this.state.loading){
            return (
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Online Application Review</span>
                        <center>
                            <div className="preloader-wrapper big active">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                    <div className="card-action">
                    <Link className="btn" to="/">Exit</Link>
                    </div>
                </div>
            );
        } else {
            if(this.auth){
                if(this.response){
                    if(this.response.success){
                        return(
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title">Online Application Review</span>

                                    <table className="striped">
                                        <caption>Personal Information</caption>
                                        <tbody>
                                            <tr>
                                                <th>First Name</th>
                                                <td>{this.response.data.first_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Name</th>
                                                <td>{this.response.data.last_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Date Of Birth</th>
                                                <td>{this.response.data.date_of_birth}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />

                                    <table className="striped">
                                        <caption>Address</caption>
                                        <tbody>
                                            <tr>
                                                <th>Province</th>
                                                <td>{this.response.data.province}</td>
                                            </tr>
                                            <tr>
                                                <th>Town</th>
                                                <td>{this.response.data.town}</td>
                                            </tr>
                                            <tr>
                                                <th>Physical Address</th>
                                                <td>{this.response.data.physical_address}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />

                                    <table className="striped">
                                        <caption>Admission</caption>
                                        <tbody>
                                            <tr>
                                                <th>Admission type</th>
                                                <td>{this.response.data.admission_type}</td>
                                            </tr>
                                            <tr>
                                                <th>First Choice</th>
                                                <td>{this.response.data.first_choice}</td>
                                            </tr>
                                            <tr>
                                                <th>Second Choice</th>
                                                <td>{this.response.data.second_choice}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />

                                    <table className="striped">
                                        <caption>Grade 12 Results</caption>
                                        <tbody>
                                            <tr>
                                                <th>Secondary School Attended</th>
                                                <td>{this.response.data.secondary_school_attended}</td>
                                            </tr>
                                            <tr>
                                                <th>English Language</th>
                                                <td>{this.response.data.english_language}</td>
                                            </tr>
                                            <tr>
                                                <th>Mathematics</th>
                                                <td>{this.response.data.mathematics}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />

                                    <table className="striped">
                                        <caption>Documents</caption>
                                        <tbody>
                                            <tr>
                                                <th>Results transcript</th>
                                                <td>{this.response.data.results_transcript}</td>
                                            </tr>
                                            <tr>
                                                <th>NRC</th>
                                                <td>{this.response.data.nrc}</td>
                                            </tr>
                                            <tr>
                                                <th>Passport Photo</th>
                                                <td>{this.response.data.passport_photo}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />

                                    <table className="striped">
                                        <caption>Next of kin</caption>
                                        <tbody>
                                            <tr>
                                                <th>Next of kin full name</th>
                                                <td>{this.response.data.next_of_kin_full_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Next of kin email</th>
                                                <td>{this.response.data.next_of_kin_email}</td>
                                            </tr>
                                            <tr>
                                                <th>Next of kin phone</th>
                                                <td>{this.response.data.next_of_kin_phone}</td>
                                            </tr>
                                        </tbody>
                                    </table><br />
                                    <center><button onClick={this.submitApplication} className="btn">Submit Application</button></center>
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
                                    <span className="card-title">Online Application Review</span>
                                    <p>{this.response.message}</p>
                                </div>
                                <div className="card-action">
                                <Link className="btn" to="/">Exit</Link>
                                </div>
                            </div>
                        );
                    }
                } else {
                    return(
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Online Application Review</span>
                                <ul className="collapsible">
                                    <li>
                                        <div className="collapsible-header">Nothing to show!</div>
                                        <div className="collapsible-body"></div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-action">
                            <Link className="btn" to="/">Exit</Link>
                            </div>
                        </div>
                    );
                }
            } else {
                return(
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Online Application Review</span>
                            <Link className="btn" to='/login'>Login</Link>
                        </div>
                        <div className="card-action">
                        <Link className="btn" to="/">Exit</Link>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Review;