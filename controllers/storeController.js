window.divulgadores.app.controllers.StoreController = (function(){

    var optionsList = {
        register: [
            {label: "Sim", value: true},
            {label: "Não", value: false}
        ],
        comission: [
            {label: "Porcentagem", value: 1},
            {label: "Valor fixo", value: 2},   
        ],
        paymentTriggers: [
            { label: "Venda Realizada", value: 1 },
            { label: "Pagamento Aprovado", value: 2 },
            { label: "Pedido Entregue", value: 3 },
            { label: "Pedido Finalizado", value: 4 },
            
        ]
    };


    var store = {
        allowRegister: true,
        appTitle: '',
        comissionType: 1,
        comissionValue: "0",
        createdAt: "",
        enviromentId: 1,
        id: 1,
        minimumValue: "0",
        name: "",
        paymentTime: 0,
        paymentTrigger: 0,
        protectedRegister: true,
        publicId: "",
        status: 1,
        updatedAt: "",
        url: "",
        websiteId: 0,
    };

    var formInputs = {
        allowRegister:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    typeof(data) !== 'boolean'
                );
                return !this.hasErrors;
            }
        },
        protectedRegister:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    typeof(data) !== 'boolean'
                );
                return !this.hasErrors;
            }
        },
        comissionType: {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === 0 ||
                    data > 2
                );
                return !this.hasErrors;
            }
        },
        comissionValue:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 7
                );
                return !this.hasErrors;
            },
            mask: function() {
                var prefix = "% ";
                if (formInputs.comissionType.data == 1) prefix = "% ";
                if (formInputs.comissionType.data == 2) prefix = "R$";
                
                this.data = this.data.replace(/\D/g,"");      
                this.data = this.data.replace(/(\d{1,3})(\d{2})/,prefix+" $1,$2");

                if (this.data.replace(/\D/g,"").length > 5) {
                    this.data = this.data.replace(/\D/g,"");      
                    this.data = this.data.replace(/(\d{1,3})(\d{3})(\d{2})/,prefix+" $1.$2,$3");
                }
            },
            unmask: function () {
                return parseFloat(this.data.replace(/\D/g, "").replace(/(\d{1,10})(\d{2})/, "$1.$2")).toFixed(2);
            }
        },
        minimumValue:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data.length < 7
                );
                return !this.hasErrors;
            },
            mask: function() {
                var prefix = "R$";
                this.data = this.data.replace(/\D/g,"");     
                this.data = this.data.replace(/(\d{1,3})(\d{2})/,prefix+" $1,$2");

                if (this.data.replace(/\D/g,"").length > 5) {
                    this.data = this.data.replace(/\D/g,"");      
                    this.data = this.data.replace(/(\d{1,3})(\d{3})(\d{2})/,prefix+" $1.$2,$3");
                }
            },
            unmask: function () {
                return parseFloat(
                    this.data.replace(/\D/g, "").replace(/(\d{1,10})(\d{2})/, "$1.$2")
                ).toFixed(2);
            }
        },
        paymentTime:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === ''
                );
                return !this.hasErrors;
            }
        },
        appTitle:  {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === ''
                );
                return !this.hasErrors;
            }
        },
        paymentTrigger: {
            data:'',
            required: true,
            hasErrors: false,
            errorMessage: '* Campo Obrigatório',
            validate: function () {
                var data = this.data;
                this.hasErrors = (
                    data === '' ||
                    data === 0  ||
                    data < 1    ||
                    data > 4
                );
                return !this.hasErrors;
            }
        }
    }
    
    var getStore = function() {
        var tempStore = store;
        var tempForm = formInputs;
        ws.getStore().then(
            function(response) {
                Object.assign(tempStore, response.data);
                Object.keys(tempForm).forEach(function(key){
                    tempForm[key].data = tempStore[key];
                    if (tempForm[key].mask !== undefined) tempForm[key].mask();
                })
            }
        ).catch(
            function(err) {
                console.error(err);
                window.alert("Erro insperado! Por favor, tente novamente mais tarde!");
            }
        )
    }

    var validateForm = function() {
        var isValid = true;
        var keys = Object.keys(formInputs);
        var payload = store;
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

    var saveStore = function(event, loading, callback) {
        event.preventDefault();
        var validation = validateForm();
        if (validation.isValid) { 
            loading.toogleLoad();
            ws.changeStore(validation.payload).then(
                function(response){
                    callback();
                }
            ).catch(function(err){
                console.error(err);
                alert("Erro inesperado. Tente novamente mais tarde");
            }).finally(function(){loading.toogleLoad();})
        }   
    }

    return {
        store,
        formInputs,
        optionsList,
        getStore,
        saveStore
    }
})();