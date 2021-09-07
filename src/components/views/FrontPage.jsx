import React from "react";
import { Link } from "react-router-dom";

class FrontPage extends React.Component {
    render(){
        var api_token = sessionStorage.getItem("api_token") || null;
        console.log(api_token);
        return (
            <div className="collection">
                <Link to="/login" className="collection-item">Login to edit your application</Link>
                <Link to="/initialization" className="collection-item">Online Application Form</Link>
            </div>
        );
    }
}

export default FrontPage;