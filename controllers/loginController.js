window.divulgadores.controllers.LoginController = (function(){
    var formInputs = {
        username: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite seu e-mail corretamente',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 4
                );
            }
        },
        password: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite sua senha',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length === 0
                );
            }
        }
    };

    var recoveryFormInputs = {
        email: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite seu e-mail corretamente',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 4
                );
            }
        }
    }

    var isRecovery = false;
    var recoveryMessage = {
        s: false
    };

    var setRecovery = function($event) {
        $event.preventDefault();
        this.recoveryMessage.s = false;
        this.isRecovery = !this.isRecovery;
    }

    var setRecoveryMessage = function() {
        recoveryMessage.s = !recoveryMessage.s;
    }

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        for(var i = 0; i < keys.length; i++) {
            if (formInputs[keys[i]].validate()) {
                isValid = false; 
            }
        }
        return isValid;
    };

    var validateRecoveryForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        for(var i = 0; i < keys.length; i++) {
            if (formInputs[keys[i]].validate()) {
                isValid = false; 
            }
        }
        return isValid;
    };
    
    var submit = function(router, event, loading) {
        loading.toogleLoad();
        event.preventDefault();
        if (validateForm()) {
            ws.authenticate(formInputs.username.data, formInputs.password.data)
            .then(function(response) {
                loading.toogleLoad();
                auth.setToken(response.data.token)
                router.push('dashboard');
            }).catch(function(err){
                loading.toogleLoad();
                alert('Login incorreto');
            })
        }
    };

    var recover = function(recoverMessage, event, loading) {
        loading.toogleLoad();
        event.preventDefault();
        if (validateRecoveryForm()) {
            var payload = {
                email: recoveryFormInputs.email.data
            };
            ws.sendRecoveryEmail(payload)
            .then(function(response) {
                loading.toogleLoad();
                recoverMessage.s = true;
            }).catch(function(err){
                loading.toogleLoad();
                alert('Erro inesperado! Tente novamente mais tarde.');
            })
        }
    }

    var goToHome = function(router) {
        router.replace('/');
    }

    return {
        isRecovery,
        formInputs,
        recoveryFormInputs,
        recoveryMessage,
        validateRecoveryForm,
        recover,
        setRecovery,
        setRecoveryMessage,
        submit,
        goToHome
    };
})();