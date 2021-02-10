window.app.controllers.SalesListController = (function(){

    var salesValues = {
        sales: "",
        comission: "",
        confirmed: "",
        canceled: ""
    }

    var sales = [];
    var table = {
        totalItems: 0,
        totalPages:0,
        currentPage: 1,
        params: {
            size: 25,
            page: 1
        }
    }

    var getSales = function() {
        ws.getSales(table.params).then(
            function(response){
                table.totalItems = response.data.totalItems;
                table.totalPages = response.data.totalPages;
                table.currentPage = response.data.currentPage;
                sales.splice(0, sales.length);
                Object.assign(sales, response.data.items);
            }
        );

        ws.getSalesStats().then(
            function(response) {
                salesValues.sales = utils.formatCurrency(response.data.sales)
                salesValues.comission = utils.formatCurrency(response.data.comission)
                salesValues.confirmed = utils.formatCurrency(response.data.confirmed)
                salesValues.canceled = utils.formatCurrency(response.data.canceled)
            }
        )
    }

    var setStatusFilter = function ($event) {
        if ($event.target.value !== '') {
            table.params.status = $event.target.value;
        } else {
            if (table.params.status !== undefined) delete table.params.status; 
        }
        getSales();
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

    return {
        sales,
        table,
        salesValues,
        getSales,
        setStatusFilter,
        nextPage,
        previousPage
    }
})();