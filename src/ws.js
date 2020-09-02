var ws = (function (){
    var url = window.configs.apiUrl;
    
    var auth = function (user, password) {
        return mockAuth(user, password);
    }

    var mockAuth = function (user, password) {
        var isValid = false;
        if (
            user === 'nicolas' && password === '321' ||
            user === 'charles' && password === '123'
        ) {
            isValid = true;
        }

        var token = '';
        if (isValid) {
            token = atob(JSON.stringify({name: user, profile: 'user',}))+"."+atob(JSON.stringify({expDate: Date.now()}))
        }
        return isValid ? token : null;
    }
    
    return {
        url,
        auth,
    }
})();