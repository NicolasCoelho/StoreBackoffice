window.divulgadores.controllers.RequirementsController = (function(){

    var reqsOptions = [
        {label: "Sim", value: true},
        {label: "Não", value: false},
    ]

    var requirements = {
        account: false,
        accountOwner: false,
        accountOwnerCpf: false,
        address: false,
        addressNumber: false,
        agency: false,
        bank: false,
        birthLocation: false,
        birthdate: false,
        cep: false,
        city: false,
        cpfCnpj: false,
        createdAt: "",
        gender: false,
        id: 0,
        literacy: false,
        maritalStatus: false,
        nationality: false,
        neighborhood: false,
        phone1: false,
        phone2: false,
        pis: false,
        rg: false,
        state: false,
        storeId: 0,
        updatedAt: "",
    }

    var getRequirements = function() {
        var tempReqs = requirements;
        ws.getUserRequirements(auth.getTokenData().s).then(
            function(response) {
                Object.assign(tempReqs, response.data);
            }
        ).catch(
            function(err) { 
                console.error(err);
                window.alert("Erro inesperado! Tente novamente mais tarde!");
            }
        )
    }

    var saveRequirements = function($event, loading, callback) {
        $event.preventDefault();
        loading.toogleLoad();

        var payload = new Object();
        Object.assign(payload, requirements);

        var id = payload.id;
        delete payload.id;
        delete payload.createdAt;
        delete payload.updatedAt;
        delete payload.storeId;
        
        ws.changeRequirements(id, payload).then(
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

    return {
        reqsOptions,
        requirements,
        getRequirements,
        saveRequirements
    }
})();