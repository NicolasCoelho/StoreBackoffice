window.divulgadores.app.controllers.UsersListController = (function(){

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

    var setStatusFilter = function ($event) {
        if ($event.target.value !== '') {
            table.params.status = $event.target.value;
        } else {
            if (table.params.status !== undefined) delete table.params.status; 
        }
        getUsers();
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
        ws.changeUserStatus(userId, { status: 2 }).then(
            function(response){
                getUsers();
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        });
    }

    var disableUser = function(userId) {
        ws.changeUserStatus(userId, { status: 3 }).then(
            function(response){
                getUsers();
            }
        ).catch(function(err){
            console.error(err);
            alert("Erro inesperado. Tente novamente mais tarde!");
        });
    }

    return {
        users,
        table,
        search,
        findUser,
        getUsers,
        setStatusFilter,
        editUser,
        enableUser,
        disableUser,
        nextPage,
        previousPage
    }
})();