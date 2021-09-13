import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../custom_modules/api_config";

class FrontPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
        this.logout = this.logout.bind(this);
        this.auth = sessionStorage.getItem('api_token') || null;
        this.application = null;
    }

    getApplication(){
        var p = this;
        p.setState({loading: true});
        axios.get(baseUrl+'/application/get?api_token='+this.auth).then(function(response){
            p.application = response.data;
            p.setState({loading: false});
        }).catch(function(error){
            if(error.response){
                p.application = error.response.data;
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

    componentDidMount(){
        if(this.auth){
            this.getApplication();
        }
    }

    logout(){
        sessionStorage.removeItem('api_token');
        this.props.history.push('/');
    }

    render(){
        console.log(this.application);
        if(this.auth){
            if(this.application){
                if(this.application.success){
                    if(this.application.data.application_submitted){
                        return (
                            <div className="collection">
                                <Link to="/application/status" className="collection-item">Application Status</Link>
                                <Link to="#" onClick={this.logout} className="collection-item">Logout</Link>
                            </div>
                        );
                    } else {
                        return (
                            <div className="collection">
                                <Link to="/page/1" className="collection-item">Personal Information</Link>
                                <Link to="/page/2" className="collection-item">Address</Link>
                                <Link to="/page/3" className="collection-item">Admission</Link>
                                <Link to="/page/4" className="collection-item">Grade 12 Results</Link>
                                <Link to="/page/5" className="collection-item">Documents</Link>
                                <Link to="/page/6" className="collection-item">Next of kin</Link>
                                <Link to="/review" className="collection-item">Review and submit</Link>
                                <Link to="#" onClick={this.logout} className="collection-item">Logout</Link>
                            </div>
                        );
                    }
                } else {
                    alert(this.application.message);
                    return (
                        <div className="collection">
                            <Link to="/login" className="collection-item">Login</Link>
                            <Link to="/initialization" className="collection-item">New Online Application</Link>
                        </div>
                    );
                }
            } else {
                return (
                    <div className="collection">
                        <Link to="/login" className="collection-item">Login</Link>
                        <Link to="/initialization" className="collection-item">New Online Application</Link>
                    </div>
                );
            }
        } else {
            return (
                <div className="collection">
                    <Link to="/login" className="collection-item">Login</Link>
                    <Link to="/initialization" className="collection-item">New Online Application</Link>
                </div>
            );
        }
    }
}

export default FrontPage;