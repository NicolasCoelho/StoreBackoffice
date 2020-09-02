var auth = (function() {
    
    var token = localStorage.getItem('token');

    var isLoggedIn = function () {
        console.log(token);
        if (token === "" || token === null) return false; 
        
        var { expTime } = decodeToken();
        expTime = new Date(expTime);

        return ( expTime.getTime() > Date.now() ); 
    }

    var login = function (user, password) {
        // TODO: fetch login with user and password as params and save token on storage 
    }

    var logOut = function () {
        localStorage.removeItem('token');
    }

    var getTokenInfo = function () {
        if (token === "") return null;
        return decodeToken();
    }

    var decodeToken = function () {
        var splited = token.split('.');
        var decoded = {
            data: btoa(splited[0]),
            expTime: btoa(splited[1]) 
        }
        return decoded;
    }
    
    return {
        isLoggedIn,
        login,
        logOut,
        getTokenInfo
    }
})();