import React from "react";

class RenderResponse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formData: null}
        this.loading = false;
    }

    render(){
        if(this.props.isLoading){
            return <p>Loading...</p>;
        } else {
            if (this.props.response != null){
                return(
                    <p>{this.props.response.message}</p>
                );
            } else {
                return <p></p>;
            }
        }
    }
}

export default RenderResponse;