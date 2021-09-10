import React from "react";
import { Link } from "react-router-dom";

class FrontPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            auth: sessionStorage.getItem("api_token") || null
        }
        this.logout = this.logout.bind(this);
    }
    logout(){
        sessionStorage.removeItem('api_token');
        this.setState({auth: sessionStorage.getItem("api_token") || null});
    }
    render(){
        if(this.state.auth){
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