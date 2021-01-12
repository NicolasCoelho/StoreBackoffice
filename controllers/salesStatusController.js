window.app.controllers.SalesStatusController = (function(){

    var salesStatus = {
        id: 0,
        storeId: 0,
        received: 0,
        completed: 0,
        canceled: 0,
        createdAt: "",
        updatedAt: ""
    }

    var formInputs = {
        received:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === ""         ||
                    data === undefined  ||
                    data === null
                );
                return !this.hasErrors;
            }
        },
        completed:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === ""         ||
                    data === undefined  ||
                    data === null
                );
                return !this.hasErrors;
            }
        },
        canceled:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === ""         ||
                    data === undefined  ||
                    data === null
                );
                return !this.hasErrors;
            }
        },
    }

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        var payload = salesStatus;
        for(var i = 0; i < keys.length; i++) {
            if (!formInputs[keys[i]].required) continue;
            
            var validation = formInputs[keys[i]].validate();
            
            if (!validation) {
                isValid = false;
                hasFormErrors = true;
            } else {
                if (formInputs[keys[i]].unmask === undefined) {
                    payload[keys[i]] = formInputs[keys[i]].data;
                } else {
                    payload[keys[i]] = formInputs[keys[i]].unmask();
                }
            }
        }
        return {isValid: isValid, payload: payload};
    };

    var getSalesStatus = function() {
        var tempSalesStatus = salesStatus;
        var tempForm = formInputs;
        ws.getSalesStatus(auth.getTokenData().s).then(
            function(response) {
                console.log(response.data);
                Object.assign(tempSalesStatus, response.data);
                Object.keys(tempForm).forEach(function(key){
                    tempForm[key].data = tempSalesStatus[key];
                    if (tempForm[key].mask !== undefined) tempForm[key].mask();
                })
            }
        ).catch(
            function(err) { 
                console.error(err);
                window.alert("Erro inesperado! Tente novamente mais tarde!");
            }
        )
    }

    var saveSalesStatus = function($event, loading, callback) {
        $event.preventDefault();
        var validation = validateForm();
        if (validation.isValid) {
            loading.toogleLoad();

            var payload = new Object();
            Object.assign(payload, salesStatus);
    
            var id = payload.id;
            delete payload.id;
            delete payload.createdAt;
            delete payload.updatedAt;
            delete payload.storeId;
            
            ws.changeSalesStatus(id, payload).then(
                function (response) {
                    callback();
                }
            ).catch(
                function(err) { 
                    console.error(err);
                    window.alert("Erro inesperado! Tente novamente mais tarde!");
                }
            ).finally(function(){loading.toogleLoad();})    
        }
    }

    return {
        salesStatus,
        formInputs,
        getSalesStatus,
        validateForm,
        saveSalesStatus
    }
})();