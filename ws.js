'use strict';
var Ws = function (httpClient){
    this.http = httpClient.create();

    this.apiUrl = window.divulgadores.configs.wsUrl;
    this.staticUrl = window.divulgadores.configs.staticUrl;
    this.viacepUrl = "https://viacep.com.br/ws/";
    this.id = window.divulgadores.configs.id;

    this.headers = {
        Authorization: "Basic " + sessionStorage.getItem("Token")
    };

    this.tokenInterceptor = function (request) {
        if (auth.hasToken() && auth.isTokenExpired()) {
            if (auth.isLoggedToken()) {
                alert("Sua sessão expirou. Faça o login novamente.")
            }
            auth.logOut();
            window.location.reload();
        }
        return request;
    }

    this.interceptorError = function(error) {
        return Promise.reject(error);
    }

    this.http.interceptors.request.use(this.tokenInterceptor, this.interceptorError)

    this.updateHeaders = function(newToken) {
        headers.Authorization = "Basic " + newToken; 
    }

    this.getToken = function() {
        return http.post(apiUrl+"token", {storeId: id}).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    }
    
    this.authenticate = function (user, password) {
        return http.post(apiUrl+'auth', {username: user, password: password}, { headers }).then(
            function(response) {
                headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    };

    this.register = function (payload, captcha) {
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

    this.getRegisterOptions = function () {
        return http.get(apiUrl+"registerOptions", {headers});
    }

    this.findCep = function (cep) {
        cep = cep.replace('-','');
        return http.get(viacepUrl+cep+"/json");
    }

    this.getUserRequirements = function (storeId) {
        return http.get(apiUrl+"userRequirements/"+storeId+"/store", {headers});
    }

    this.changeRequirements = function(id, payload) {
        return http.put(apiUrl+"userRequirements/"+id, payload, {headers});
    }

    this.getUsers = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'users'+queryString, {headers});
    }

    this.getUserByPublicId = function(userId) {
        return http.get(apiUrl+"user/"+userId, {headers});
    }

    this.changeUser = function(userId, payload) {
        return http.put(apiUrl+'user/'+userId, payload, {headers})
    }

    this.changeUserStatus = function(userId, payload) {
        return http.put(apiUrl+'user/'+userId+'/changeStatus', payload, {headers});
    }

    this.denyUserRegister = function(userId, payload) {
        return http.post(apiUrl+'user/'+userId+'/register/deny', payload, {headers})
    }

    this.verifyUser = function (payload) {
        return http.post(apiUrl+"user/verify", payload, {headers});
    }

    this.getUserShareInfos = function(userId) {
        return http.get(apiUrl+"user/"+userId+"/shareInfos", {headers});
    }

    this.getContract = function (storeId) {
        return http.get(apiUrl+"contract/"+storeId, {headers});
    }

    this.changeContract = function (id, payload) {
        return http.put(apiUrl+"contract/"+id, payload, {headers}); 
    }

    this.getStore = function () {
        return http.get(apiUrl+"store", {headers});
    }

    this.changeStore = function(payload) {
        return http.put(apiUrl+"store", payload, {headers});
    }

    this.getSalesStatus = function(storeId) {
        return http.get(apiUrl+'salesStatus/'+storeId+"/store", {headers});
    }

    this.changeSalesStatus = function(id, payload) {
        return http.put(apiUrl+'salesStatus/'+id, payload, {headers});
    }

    this.getSales = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'sales'+queryString, {headers});
    }
    
    this.getSalesStats = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'sales/stats/all'+queryString, {headers})
    }

    this.setUrlParams = function(params) {
        var queryString = ""; 
        Object.keys(params).forEach(function(key){
            queryString += queryString === '' ? '?' : '&';
            queryString +=  key+'='+params[key];   
        });
        return queryString
    }

    this.getPayments = function(params) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'payments'+queryString, {headers});
    }

    this.getPaymentDetails = function(paymentId) {
        return http.get(apiUrl+'payment/'+paymentId, {headers});
    }

    this.changePaymentStatus = function(paymentId, payload) {
        return http.put(apiUrl+'payment/'+paymentId+'/changeStatus', payload, {headers});
    }
    this.getPaymentsStats = function(params={}) {
        var queryString = setUrlParams(params);
        return http.get(apiUrl+'payments/stats/all'+queryString, {headers})
    }

    this.sendRecoveryEmail = function(payload) {
        return http.post(apiUrl+"auth/recovery", payload, {headers});
    }

    this.changePassword = function(payload) {
        return http.post(apiUrl+"auth/changePassword", payload, {headers});
    }
}