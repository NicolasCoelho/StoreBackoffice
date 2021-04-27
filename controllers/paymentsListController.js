window.divulgadores.controllers.PaymentsListController = (function(){
    var paymentsStatus = [
        {viewValue: "Pendentes", value: "1"},
        {viewValue: "Pagas", value: "2"},
        {viewValue: "Em análise", value: "3"},
        {viewValue: "Bloqueadas", value: "4"}
    ];

    var paymentsPeriods = [
        {viewValue: "Último mês", value: "1"},
        {viewValue: "Últimos 3 meses", value: "2"},
        {viewValue: "Todo perído", value: "3"}
    ];

    var payments = [];
    var table = {
        totalItems: 0,
        totalPages:0,
        currentPage: 1,
        params: {
            size: 25,
            page: 1
        }
    }

    var getPayments = function() {
        ws.getPayments(table.params).then(
            function(response){
                table.totalItems = response.data.totalItems;
                table.totalPages = response.data.totalPages;
                table.currentPage = response.data.currentPage;
                payments.splice(0, payments.payments);
                Object.assign(payments, response.data.items);
            }
        );

        // ws.getSalesStats().then(
        //     function(response) {
        //         salesValues.sales = utils.formatCurrency(response.data.sales)
        //         salesValues.comission = utils.formatCurrency(response.data.comission)
        //         salesValues.confirmed = utils.formatCurrency(response.data.confirmed)
        //         salesValues.canceled = utils.formatCurrency(response.data.canceled)
        //     }
        // )
    }

    var setFilter = function ($event) {
        if ($event.target.value !== '') {
            table.params.status = $event.target.value;
        } else {
            if (table.params.status !== undefined) delete table.params.status; 
        }
        getPayments();
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

    var details = function(router, id) {
        router.push('pagamento/'+id);
    }

    return {
        payments,
        table,
        paymentsStatus,
        paymentsPeriods,
        getPayments,
        setFilter,
        nextPage,
        previousPage,
        details
    }
})();