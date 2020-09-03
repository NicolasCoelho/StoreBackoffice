var ws = (function (){
    var url = 'http://localhost:3000';
    
    var authenticate = function (user, password) {
        return mockAuthenticate(user, password);
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
                    var token = createMockToken({name: user, profile: 'USER'}, 10);
                    resolve((isValid ? token : null));
                } else {
                    reject("Usuário ou senha inválidos");
                }
            }, (2000));
        });
    };

    var mockRegister = function(data) {
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                var payload = {
                    name: data.name,
                    email: data.email,
                    profile: "USER"
                };
                !rejectAll ? resolve(createMockToken(payload, 10)) : reject();
            }, 1000);
        })
    };

    var createMockToken = function (data, timeExp) {
        var token = '';
        token = btoa(JSON.stringify(data))+"."+btoa(JSON.stringify({expDate: Date.now()+(timeExp*1000*60) }));
        return token;
    }
    
    return {
        url,
        authenticate,
        register
    };
})();