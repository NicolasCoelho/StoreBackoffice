var ws = (function (){
    var url = 'http://localhost:3000';
    
    var authenticate = function (user, password) {
        return mockAuthenticate(user, password);
    };


    // Methods below just for mock tests
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
                var token = '';
                if (isValid) {
                    token = btoa(JSON.stringify({name: user, profile: 'user'}))+"."+btoa(JSON.stringify({expDate: Date.now()+600000 }));
                    resolve((isValid ? token : null));
                } else {
                    reject("Usuário ou senha inválidos");
                }
            }, (2000));
        });
    };
    
    return {
        url,
        authenticate,
    };
})();