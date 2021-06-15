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

    this.tokenInterceptor = (request) => {
        if (auth.hasToken() && auth.isTokenExpired()) {
            if (auth.isLoggedToken()) {
                alert("Sua sessão expirou. Faça o login novamente.")
            }
            auth.logOut();
            window.location.reload();
        }
        return request;
    }

    this.interceptorError = (error) => {
        return Promise.reject(error);
    }

    this.http.interceptors.request.use(this.tokenInterceptor, this.interceptorError)

    this.updateHeaders = (newToken) => {
        this.headers.Authorization = "Basic " + newToken; 
    }

    this.getToken = () => {
        return this.http.post(this.apiUrl+"token", {storeId: this.id}).then(
            (response) => {
                this.headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    }
    
    this.authenticate = (user, password) => {
        return this.http.post(this.apiUrl+'auth', {username: user, password: password}, {headers: this.headers}).then(
            (response) => {
                this.headers.Authorization = "Basic " + response.data.token;
                return response;
            }
        )
    };

    this.register = (payload, captcha) => {
        var tempHeaders = new Object();
        Object.assign(tempHeaders, headers);
        tempHeaders.Captcha = captcha;
        return this.http.post(this.apiUrl+"register", payload, {headers: tempHeaders}).then(
            (response) => {
                auth.setToken(response.data.token);
                return response;
            }
        )
    };

    this.getRegisterOptions = () => {
        return this.http.get(this.apiUrl+"registerOptions", {headers: this.headers});
    }

    this.findCep = (cep) => {
        cep = cep.replace('-','');
        return this.http.get(this.viacepUrl+cep+"/json");
    }

    this.getUserRequirements = (storeId) => {
        return this.http.get(this.apiUrl+"userRequirements/"+storeId+"/store", {headers: this.headers});
    }

    this.changeRequirements = (id, payload) => {
        return this.http.put(this.apiUrl+"userRequirements/"+id, payload, {headers: this.headers});
    }

    this.getUsers = (params) => {
        var queryString = this.setUrlParams(params);
        return this.http.get(this.apiUrl+'users'+queryString, {headers: this.headers});
    }

    this.getUserByPublicId = (userId) => {
        return this.http.get(this.apiUrl+"user/"+userId, {headers: this.headers});
    }

    this.changeUser = (userId, payload) => {
        return this.http.put(this.apiUrl+'user/'+userId, payload, {headers: this.headers})
    }

    this.changeUserStatus = (userId, payload) => {
        return this.http.put(this.apiUrl+'user/'+userId+'/changeStatus', payload, {headers: this.headers});
    }

    this.denyUserRegister = (userId, payload) => {
        return this.http.post(this.apiUrl+'user/'+userId+'/register/deny', payload, {headers: this.headers})
    }

    this.verifyUser = (payload) => {
        return this.http.post(this.apiUrl+"user/verify", payload, {headers: this.headers});
    }

    this.getUserShareInfos = (userId) => {
        return this.http.get(this.apiUrl+"user/"+userId+"/shareInfos", {headers: this.headers});
    }

    this.getContract = (storeId) => {
        return this.http.get(this.apiUrl+"contract/"+storeId, {headers: this.headers});
    }

    this.changeContract = (id, payload) => {
        return this.http.put(this.apiUrl+"contract/"+id, payload, {headers: this.headers}); 
    }

    this.getStore = () => {
        return this.http.get(this.apiUrl+"store", {headers: this.headers});
    }

    this.changeStore = (payload) => {
        return this.http.put(this.apiUrl+"store", payload, {headers: this.headers});
    }

    this.getSalesStatus = (storeId) => {
        return this.http.get(this.apiUrl+'salesStatus/'+storeId+"/store", {headers: this.headers});
    }

    this.changeSalesStatus = (id, payload) => {
        return this.http.put(this.apiUrl+'salesStatus/'+id, payload, {headers: this.headers});
    }

    this.getSales = (params) => {
        var queryString = this.setUrlParams(params);
        return this.http.get(this.apiUrl+'sales'+queryString, {headers: this.headers});
    }
    
    this.getSalesStats = (params) => {
        var queryString = this.setUrlParams(params);
        return this.http.get(this.apiUrl+'sales/stats/all'+queryString, {headers: this.headers})
    }

    this.setUrlParams = (params) => {
        var queryString = ""; 
        Object.keys(params).forEach(function(key){
            queryString += queryString === '' ? '?' : '&';
            queryString +=  key+'='+params[key];   
        });
        return queryString
    }

    this.getPayments = (params) => {
        var queryString = this.setUrlParams(params);
        return this.http.get(this.apiUrl+'payments'+queryString, {headers: this.headers});
    }

    this.getPaymentDetails = (paymentId) => {
        return this.http.get(this.apiUrl+'payment/'+paymentId, {headers: this.headers});
    }

    this.changePaymentStatus = (paymentId, payload) => {
        return this.http.put(this.apiUrl+'payment/'+paymentId+'/changeStatus', payload, {headers: this.headers});
    }
    this.getPaymentsStats = (params={}) => {
        var queryString = this.setUrlParams(params);
        return this.http.get(this.apiUrl+'payments/stats/all'+queryString, {headers: this.headers})
    }

    this.sendRecoveryEmail = (payload) => {
        return this.http.post(this.apiUrl+"auth/recovery", payload, {headers: this.headers});
    }

    this.changePassword = (payload) => {
        return this.http.post(this.apiUrl+"auth/changePassword", payload, {headers: this.headers});
    }
}