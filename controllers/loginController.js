window.controllers.LoginController = (function(){
    var formInputs = {
        username: {
            data:'',
            hasErrors: false,
            errorMessage: '* Digite seu nome completo',
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
    
    var submit = function(router, event) {
        event.preventDefault();
        if (validateForm()) {
            auth.login(formInputs.username.data, formInputs.password.data)
            .then(function(response) {
                router.push('dashboard', (a)=>console.log(a), (b)=>console.log(b),);
            }).catch(function(err){
                console.log(err);
            })
        }
    };

    return {
        formInputs,
        submit
    };
})();