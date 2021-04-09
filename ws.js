var ws = (function (){
    var apiUrl = window.app.configs.wsUrl;
    var staticUrl = window.app.configs.staticUrl;
    var viacepUrl = "https://viacep.com.br/ws/";
    var id = window.app.configs.id;
    var headers = {
        Authorization: "Basic " + localStorage.getItem("Token")
    };

    var updateHeaders = function(newToken) {
        headers.Authorization = "Basic " + newToken; 
    }

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

    var getRegisterOptions = function () {
        return axios.get(apiUrl+"registerOptions", {headers});
    }

    var findCep = function (cep) {
        cep = cep.replace('-','');
        return axios.get(viacepUrl+cep+"/json");
    }

    var getUserRequirements = function (storeId) {
        return axios.get(apiUrl+"userRequirements/"+storeId+"/store", {headers});
    }

    var changeRequirements = function(id, payload) {
        return axios.put(apiUrl+"userRequirements/"+id, payload, {headers});
    }

    var getUsers = function(params) {
        var queryString = setUrlParams(params);
        return axios.get(apiUrl+'users'+queryString, {headers});
    }

    var getUserByPublicId = function(userId) {
        return axios.get(apiUrl+"user/"+userId, {headers});
    }

    var changeUser = function(userId, payload) {
        return axios.put(apiUrl+'user/'+userId, payload, {headers})
    }

    var changeUserStatus = function(userId, payload) {
        return axios.put(apiUrl+'user/'+userId+'/changeStatus', payload, {headers});
    }

    var denyUserRegister = function(userId, payload) {
        return axios.post(apiUrl+'user/'+userId+'/register/deny', payload, {headers})
    }

    var verifyUser = function (payload) {
        return axios.post(apiUrl+"user/verify", payload, {headers});
    }

    var getUserShareInfos = function(userId) {
        return axios.get(apiUrl+"user/"+userId+"/shareInfos", {headers});
    }

    var getContract = function (storeId) {
        return axios.get(apiUrl+"contract/"+storeId, {headers});
    }

    var changeContract = function (id, payload) {
        return axios.put(apiUrl+"contract/"+id, payload, {headers}); 
    }

    var getStore = function () {
        return axios.get(apiUrl+"store", {headers});
    }

    var changeStore = function(payload) {
        return axios.put(apiUrl+"store", payload, {headers});
    }

    var getSalesStatus = function(storeId) {
        return axios.get(apiUrl+'salesStatus/'+storeId+"/store", {headers});
    }

    var changeSalesStatus = function(id, payload) {
        return axios.put(apiUrl+'salesStatus/'+id, payload, {headers});
    }

    var getSales = function(params) {
        var queryString = setUrlParams(params);
        return axios.get(apiUrl+'sales'+queryString, {headers});
    }
    
    var getSalesStats = function() {
        return axios.get(apiUrl+'sales/stats/all', {headers})
    }

    var setUrlParams = function(params) {
        var queryString = ""; 
        Object.keys(params).forEach(function(key){
            queryString += queryString === '' ? '?' : '&';
            queryString +=  key+'='+params[key];   
        });
        return queryString
    }

    var getPayments = function(params) {
        var queryString = setUrlParams(params);
        return axios.get(apiUrl+'payments'+queryString, {headers});
    }

    var getPaymentDetails = function(paymentId) {
        return axios.get(apiUrl+'payment/'+paymentId, {headers});
    }

    var changePaymentStatus = function(paymentId, payload) {
        return axios.put(apiUrl+'payment/'+paymentId+'/changeStatus', payload, {headers});
    }

    var sendRecoveryEmail = function(payload) {
        return axios.post(apiUrl+"auth/recovery", payload, {headers});
    }

    var changePassword = function(payload) {
        return axios.post(apiUrl+"auth/changePassword", payload, {headers});
    }
    
    return {
        apiUrl,
        staticUrl,
        setUrlParams,
        updateHeaders,
        getToken,
        authenticate,
        register,
        findCep,
        getUserRequirements,
        getRegisterOptions,
        getUsers,
        getUserByPublicId,
        changeUser,
        changeUserStatus,
        denyUserRegister,
        verifyUser,
        getUserShareInfos,
        getContract,
        changeContract,
        getStore,
        changeStore,
        changeRequirements,
        getSalesStatus,
        changeSalesStatus,
        getSales,
        getSalesStats,
        getPayments,
        getPaymentDetails,
        changePaymentStatus,
        sendRecoveryEmail,
        changePassword
    };
})();