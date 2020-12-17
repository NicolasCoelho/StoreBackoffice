var auth = (function () {

    var token = localStorage.getItem('Token');

    var getToken = function () {
        return this.token;
    }

    var setToken = function (token) {
        this.token = token
        localStorage.setItem('Token', token)
    }

    var isAuthenticaded = function () {
        if (!this.hasToken()) return false
        var data = this.getTokenData()
        if (data.t === 1) return false
        return !this.isTokenExpired()
    }

    var hasToken = function () {
        return (
            this.token !== null &&
            this.token !== undefined &&
            this.token !== ''
        )
    }

    var getTokenData = function () {
        var tokenData = this.decode(this.token);
        return tokenData
    }

    var isTokenExpired = function () {
        var data = this.getTokenData()
        return (Date.now().valueOf() / 1000) > data.exp
    }

    var isEmptyTokenValid = function () {
        if (!this.hasToken()) return false
        return this.isTokenExpired()
    }

    var decode = function (token) {
        var data = JSON.parse(atob(token.split('.')[1]))
        return data
    }

    var deleteToken = function () {
        this.token = null
        localStorage.removeItem('Token')
    }

    return {
        getToken,
        setToken,
        isAuthenticaded,
        hasToken,
        getTokenData,
        isTokenExpired,
        isEmptyTokenValid,
        decode,
        deleteToken
    }
})();