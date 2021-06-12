var ws = (function (){
    var http = axios.create();

    var apiUrl = window.divulgadores.configs.wsUrl;
    var staticUrl = window.divulgadores.configs.staticUrl;
    var viacepUrl = "https://viacep.com.br/ws/";
    var id = window.divulgadores.configs.id;

    var headers = {
        Authorization: "Basic " + sessionStorage.getItem("Token")
    };

    var tokenInterceptor = function (request) {
        if (auth.hasToken() && auth.isTokenExpired()) {
            if (auth.isLoggedToken()) {
                alert("Sua sessão expirou. Faça o login novamente.")
            }
            auth.logOut();
            window.location.reload();
        }
        return request;
    }

    var interceptorError = function(error) {
        return Promise.reject(error);
    }

    http.interceptors.request.use(tokenInterceptor, interceptorError)

    var updateHeaders = function(newToken) {
        headers.Authorization = "Basic " + newToken; 
    }

    var getToken = function() {
        return http.post(apiUrl+"token", {storeId: id}).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    }
    
    var authenticate = function (user, password) {
        return http.post(apiUrl+'auth', {username: user, password: password}, { headers }).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    };

    var register = function (payload, captcha) {
        var tempHeaders = new Object();
        Object.assign(tempHeaders, headers);
        tempHeaders.Captcha = captcha;
        return http.post(apiUrl+"register", payload, {headers: tempHeaders}).then(
            function (response) {
                auth.setToken(response.data.token);
                return response;
            }
        )
    };

    var getRegisterOptions = function () {
        return http.get(apiUrl+"registerOptions", {headers});
    }

    var findCep = function (cep) {
        cep = cep.replace('-','');
        return http.get(viacepUrl+cep+"/json");
    }

    var getUserRequirements = function (storeId) {
        return http.get(apiUrl+"userRequirements/"+storeId+"/store", {headers});
    }

    var changeRequirements = function(id, payload) {
        return http.put(apiUrl+"userRequirements/"+id, payload, {headers});
    }

    var getUsers = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'users'+queryString, {headers});
    }

    var getUserByPublicId = function(userId) {
        return http.get(apiUrl+"user/"+userId, {headers});
    }

    var changeUser = function(userId, payload) {
        return http.put(apiUrl+'user/'+userId, payload, {headers})
    }

    var changeUserStatus = function(userId, payload) {
        return http.put(apiUrl+'user/'+userId+'/changeStatus', payload, {headers});
    }

    var denyUserRegister = function(userId, payload) {
        return http.post(apiUrl+'user/'+userId+'/register/deny', payload, {headers})
    }

    var verifyUser = function (payload) {
        return http.post(apiUrl+"user/verify", payload, {headers});
    }

    var getUserShareInfos = function(userId) {
        return http.get(apiUrl+"user/"+userId+"/shareInfos", {headers});
    }

    var getContract = function (storeId) {
        return http.get(apiUrl+"contract/"+storeId, {headers});
    }

    var changeContract = function (id, payload) {
        return http.put(apiUrl+"contract/"+id, payload, {headers}); 
    }

    var getStore = function () {
        return http.get(apiUrl+"store", {headers});
    }

    var changeStore = function(payload) {
        return http.put(apiUrl+"store", payload, {headers});
    }

    var getSalesStatus = function(storeId) {
        return http.get(apiUrl+'salesStatus/'+storeId+"/store", {headers});
    }

    var changeSalesStatus = function(id, payload) {
        return http.put(apiUrl+'salesStatus/'+id, payload, {headers});
    }

    var getSales = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'sales'+queryString, {headers});
    }
    
    var getSalesStats = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'sales/stats/all'+queryString, {headers})
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
        return http.get(apiUrl+'payments'+queryString, {headers});
    }

    var getPaymentDetails = function(paymentId) {
        return http.get(apiUrl+'payment/'+paymentId, {headers});
    }

    var changePaymentStatus = function(paymentId, payload) {
        return http.put(apiUrl+'payment/'+paymentId+'/changeStatus', payload, {headers});
    }
    var getPaymentsStats = function(params={}) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'payments/stats/all'+queryString, {headers})
    }

    var sendRecoveryEmail = function(payload) {
        return http.post(apiUrl+"auth/recovery", payload, {headers});
    }

    var changePassword = function(payload) {
        return http.post(apiUrl+"auth/changePassword", payload, {headers});
    }
    
    return {
        http,
        tokenInterceptor,
        interceptorError,
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
        getPaymentsStats,
        sendRecoveryEmail,
        changePassword
    };
})();