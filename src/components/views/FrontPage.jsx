import React from "react";
import { Link } from "react-router-dom";

class FrontPage extends React.Component {
    render(){
        return (
            <div className="collection">
                <Link to="/initialization" className="collection-item">Online Application Form</Link>
            </div>
        );
    }
}

export default FrontPage;