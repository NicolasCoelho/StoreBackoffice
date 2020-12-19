var ws = (function (){
    var apiUrl = window.app.configs.wsUrl;
    var staticUrl = window.app.configs.staticUrl;
    var id = window.app.configs.id;
    var headers = {
        Authorization: ''
    };

    var getToken = function() {
        return axios.post(apiUrl+"token", {storeId: id}).then(
            function(response) {
                headers.Authorization = response.data.token;
                return response;
            }
        )
    }
    
    var authenticate = function (user, password) {
        return axios.post(apiUrl+'auth', {username: user, password: password}).then(
            function(response) {
                headers.Authorization = response.data.token;
                return response;
            }
        )
    };

    var register = function (data) {
        return mockRegister(data);
    };

    // Methods below just for mock tests
    var rejectAll = false;
    var mockAuthenticate = function (user, password) {
        return new Promise(function(resolve,reject) {
            setTimeout(function(){
                var isValid = false;
                if (
                    user === 'nicolas' && password === '321' ||
                    user === 'charles' && password === '123'
                ) {
                    isValid = true;
                }
                if (isValid && !rejectAll) {
                    var token = createMockToken({name: user, profile: 'USER'}, 60);
                    resolve((token));
                } else {
                    reject("Usuário ou senha inválidos");
                }
            }, (2000));
        });
    };
    
    return {
        apiUrl,
        staticUrl,
        getToken,
        authenticate,
        register
    };
})();