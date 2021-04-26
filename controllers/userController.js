window.divulgadores.app.controllers.UserController = (function(){
    
    var user = {
        account: "",
        accountOwner: "",
        accountOwnerCpf: "",
        address: "",
        addressNumber: "",
        agency: "",
        bank: "",
        birthLocation: "",
        birthdate: "",
        cep: "",
        city: "",
        cpfCnpj: "",
        email: "",
        gender: "",
        id: 0,
        literacy: "",
        maritalStatus: "",
        name: "",
        nationality: "",
        neighborhood: "",
        password: "",
        phone1: "",
        phone2: "",
        pis: "",
        publicId: "",
        rg: "",
        state: "",
        status: 0,
        storeId: 0,
        type: 0,
        createdAt: "",
        updatedAt: "2020-12-29T00:23:26.000Z",
    }

    var isDataPage = true;

    var formatStatus = function (status) {
        switch(status) {
            case 1: 
                return "Em análise"
            case 2: 
                return "Ativo"
            case 3: 
                return "Desabilitado"
            case 4: 
                return "Deletado"
            default:
                return "?" 
        }
    }

    var formatCpfCnpj = function(value) {
        return value.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/,"$1.$2.$3-$4");
    }

    var formatDate = function(date) {
        return new Date(date).toLocaleString().slice(0,10);
    }

    var getUserData = function(id, form) {
        ws.getUserByPublicId(id).then(
            function(response) {
                Object.assign(user, response.data);
                form.setDataToEdit(user);
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        })
    }

    var setUserNew = function(userId) {
        ws.changeUserStatus(userId, { status: 1 }).then(
            function(response){
                window.location.reload();
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        });
    }

    var enableUser = function(userId) {
        ws.changeUserStatus(userId, { status: 2 }).then(
            function(response){
                window.location.reload();
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        });
    }

    var disableUser = function(userId) {
        ws.changeUserStatus(userId, { status: 3 }).then(
            function(response){
                window.location.reload();
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        });
    }

    var denyRegister = function(userId) {
        var msg = window.prompt("Digite as pendencias deste cadastro:");
        if (msg !== null || msg !== '') {
            var payload = {
                message: msg
            };
            ws.denyUserRegister(userId, payload).then(
                function(response) {
                    window.location.reload();      
                }
            ).catch(function(err) {
                console.error(err);
                alert("Erro inesperado. Tente novamente mais tarde!");
            });
        }
    }

    var changeUserView = function($event, dataPage) {
        this.isDataPage = dataPage;
        $event.target.parentElement.querySelectorAll('li').forEach(function(ele){ele.classList.remove('selected')});
        $event.target.classList.toggle('selected');
    }
    
    return {
        user,
        isDataPage,
        formatStatus,
        formatCpfCnpj,
        formatDate,
        enableUser,
        disableUser,
        setUserNew,
        denyRegister,
        changeUserView,
        getUserData
    };
})();