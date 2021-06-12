var auth = (function () {

    var token = sessionStorage.getItem('Token');

    var getToken = function () {
        return token;
    }

    var setToken = function (tkn) {
        token = tkn;
        ws.updateHeaders(tkn);
        sessionStorage.setItem('Token', token);
    }

    var isAuthenticaded = function () {
        if (!hasToken()) return false;
        var data = getTokenData();
        if (data.t === 1) return false;
        return !isTokenExpired();
    }

    var isLoggedToken = function() {
        if (!hasToken()) return false;
        var data = getTokenData();
        return data.t > 1;
    }

    var hasToken = function () {
        return (
            token !== null &&
            token !== undefined &&
            token !== ''
        )
    }

    var getTokenData = function () {
        var tokenData = decode(token);
        return tokenData;
    }

    var isTokenExpired = function () {
        if (!hasToken()) return true; 
        var data = getTokenData();
        return (Date.now().valueOf() / 1000) > data.exp;
    }

    var isEmptyTokenValid = function () {
        if (!hasToken()) return false;
        return !isTokenExpired();
    }

    var decode = function (token) {
        var data = JSON.parse(atob(token.split('.')[1]));
        return data;
    }

    var deleteToken = function () {
        token = null;
        sessionStorage.removeItem('Token');
    }

    var logOut = function (router) {
        deleteToken();
        location.href = '/';
    }

    var isAdmin = function() {
        var user = getTokenData();
        return (user.t === 3);
    }

    return {
        getToken,
        isLoggedToken,
        setToken,
        isAuthenticaded,
        hasToken,
        getTokenData,
        isTokenExpired,
        isEmptyTokenValid,
        decode,
        deleteToken,
        isAdmin,
        logOut
    }
})();