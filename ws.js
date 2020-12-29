var ws = (function (){
    var apiUrl = window.app.configs.wsUrl;
    var staticUrl = window.app.configs.staticUrl;
    var viacepUrl = "https://viacep.com.br/ws/";
    var id = window.app.configs.id;
    var headers = {
        Authorization: "Basic " + localStorage.getItem("Token")
    };

    var getToken = function() {
        return axios.post(apiUrl+"token", {storeId: id}).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    }
    
    var authenticate = function (user, password) {
        return axios.post(apiUrl+'auth', {username: user, password: password}, { headers }).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    };

    var register = function (payload) {
        return axios.post(apiUrl+"register", payload, {headers}).then(
            function (response) {
                auth.setToken(response.data.token);
                return response;
            }
        )
    };

    var getUserRequirements = function (storeId) {
        return axios.get(apiUrl+"userRequirements/"+storeId+"/store", {headers});
    }

    var getRegisterOptions = function () {
        return axios.get(apiUrl+"registerOptions", {headers});
    }

    var findCep = function (cep) {
        cep = cep.replace('-','');
        return axios.get(viacepUrl+cep+"/json");
    }

    var verifyUser = function (payload) {
        return axios.post(apiUrl+"verify/user", payload, {headers});
    }
    
    return {
        apiUrl,
        staticUrl,
        getToken,
        authenticate,
        register,
        findCep,
        getUserRequirements,
        getRegisterOptions,
        verifyUser
    };
})();