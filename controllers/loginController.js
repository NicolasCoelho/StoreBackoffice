window.app.controllers.LoginController = (function(){
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

    return {
        formInputs,
        submit
    };
})();