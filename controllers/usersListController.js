window.app.controllers.UsersListController = (function(){

    var users = [];
    var search = {
        name: null,
        timer: null
    }
    var table = {
        totalItems: 0,
        totalPages:0,
        currentPage: 1,
        params: {
            size: 25,
            page: 1
        }
    }

    var getUsers = function() {
        ws.getUsers(table.params).then(function(response){
            table.totalItems = response.data.totalItems;
            table.totalPages = response.data.totalPages;
            table.currentPage = response.data.currentPage;
            users.splice(0, users.length);
            Object.assign(users, response.data.items);
        });
    }

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

    var findUser = function () {
        if (search.timer !== null) {
            clearTimeout(search.timer);
        }
        search.timer = setTimeout(function(){
            if(search.name !== "") {
                table.params.name = search.name;
                table.params.page = 1;
                table.currentPage = 1;
            } else {
                if (table.params.name !== undefined) {
                    delete table.params.name;
                } 
            }
            getUsers();
        },700);
    }

    var previousPage = function() {
        if (table.currentPage > 1 && table.currentPage <= table.totalPages) {
            table.params.page--;
            getUsers();
        }
    }

    var nextPage = function() {
        if (table.currentPage >= 1 && table.currentPage < table.totalPages) {
            table.params.page++;
            getUsers();
        }
    }

    var editUser = function(router, userId) {
        router.push('usuario/'+userId);
    }

    var enableUser = function(userId) {
        console.log(userId)
    }

    var disableUser = function(userId) {
        console.log(userId)
    }

    return {
        users,
        table,
        search,
        findUser,
        getUsers,
        formatStatus,
        formatCpfCnpj,
        formatDate,
        editUser,
        enableUser,
        disableUser,
        nextPage,
        previousPage
    }
})();