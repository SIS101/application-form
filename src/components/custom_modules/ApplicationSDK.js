var axios = require('axios');

class SDK{
    constructor(auth=null){
        this.auth = auth;
        this.baseUrl = "https://kihsr.ac.zm/public-api/public/api";
    }

    initializeApplication(formData){
        this.sendRequest("POST", "/application", formData);
    }

    sendRequest(method,end_point,data){
        var endpoint = "";
        if(this.auth != null){
            endpoint = end_point+"?api_token="+this.auth;
        } else {
            endpoint = end_point;
        }
        var config = {
            method: method,
            url: this.baseUrl+endpoint,
            data : data
        };
        axios(config).then(function(response){
            console.log(JSON.stringify(response.data));
        }).catch(function(error){
            console.log(error);
        });
    }
}

export default SDK;