var auth = (function() {
    
    var token = localStorage.getItem('X-Token');

    var isLoggedIn = function () {
        if (token === "" || token === null) return false; 
        
        var { expDate } = decodeToken().expTime;
        expDate = new Date(expDate);
        return ( expDate.getTime() > Date.now() ); 
    };

    var login = function (user, password) {
        return new Promise(function(resolve,reject){
            ws.authenticate(user,password)
            .then(function (response){
                if (response != null) {
                    token = response;
                    localStorage.setItem('X-Token', token);
                    resolve(decodeToken());
                }
            }).catch(function(err){reject(err)});
        }); 
    };

    var logOut = function (router) {
        localStorage.removeItem('X-Token');
        token = null;
        router.push('/');
    };

    var getTokenInfo = function () {
        if (token === "") return null;
        return decodeToken();
    };

    var setToken = function (to) {
        token = to;
        localStorage.setItem("X-Token", token);
    }

    var decodeToken = function () {
        var splited = token.split('.');
        var decoded = {
            data: JSON.parse(atob(splited[0])),
            expTime: JSON.parse(atob(splited[1]))
        }
        return decoded;
    };
    
    return {
        isLoggedIn,
        login,
        logOut,
        setToken,
        getTokenInfo
    };
})();