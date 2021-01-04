window.app.controllers.UserController = (function(){
    
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

    var changeUserView = function($event, dataPage) {
        this.isDataPage = dataPage;
        $event.target.parentElement.querySelectorAll('li').forEach(function(ele){ele.classList.remove('selected')});
        $event.target.classList.toggle('selected');
    }
    
    return {
        user,
        isDataPage,
        changeUserView,
        getUserData
    };
})();