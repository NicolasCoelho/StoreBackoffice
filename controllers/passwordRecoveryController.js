window.divulgadores.app.controllers.PasswordRecoveryController = (function(){
    var tokenData = new Object();

    var passwordsInputs = {
        password: {
            data:'',
            hasErrors: false,
            errorMessage: '* Sua senha deve conter mais de 4 digitos',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 4
                );
                return this.hasErrors
            }
        },
        passwordRepeat: {
            data:'',
            hasErrors: false,
            errorMessage: '* As senhas não conferem',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data !== passwordsInputs.password.data ||
                    data.length < 4
                );
                return this.hasErrors
            }
        }
    }

    var setRecoveryToken = function(token) {
        var data = token.split('.')[0]
        data = atob(data).split('.')
        data = {
            userId: data[0],
            exp: data[1],
            token
        }
        if (Date.now() > data.exp) {
            alert("Este link expirou!")
            window.close();
        }
        Object.assign(this.tokenData, data);
    }

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(passwordsInputs);
        for(var i = 0; i < keys.length; i++) {
            if (passwordsInputs[keys[i]].validate()) {
                isValid = false; 
            }
        }
        return isValid;
    };

    var submit = function(router, event, loading) {
        loading.toogleLoad();
        event.preventDefault();
        if (validateForm()) {
            var payload = {
                password: passwordsInputs.password.data,
                token: tokenData.token
            }
            ws.changePassword(payload)
            .then(function(response) {
                loading.toogleLoad();
                alert("Senha alterada com sucesso!")
                router.push('/entrar');
            }).catch(function(err){
                loading.toogleLoad();
                alert('Ocorreu um erro inesperado! Tente novamente mais tarde.');
            })
        }else {
            loading.toogleLoad();
        }
    };

    return {
        tokenData,
        passwordsInputs,
        setRecoveryToken,
        validateForm,
        submit
    }
})();