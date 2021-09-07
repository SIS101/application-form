var axios = require('axios');

class SDK{
    constructor(auth=null){
        this.auth = auth;
        this.baseUrl = "http://192.168.0.105/public-api/public/api";
    }

    login(formData){
        return this.sendRequest("POST", "/login", formData);
    }

    initializeApplication(formData){
        return this.sendRequest("POST", "/application", formData);
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
        var res = null;
        axios(config).then(function(response){
            res = response.data;
        }).catch(function(error){
            if(error.response.data){
                res = error.response.data;
            } else {
                console.log(error);
            }
        });
        return res;
    }
}

export default SDK;