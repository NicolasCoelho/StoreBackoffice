window.divulgadores.controllers.PaymentController = (function(){
    var payment = {
        createdAt: "",
        date: "",
        id: 0,
        sales: [],
        user: {
            name: '',
            cpfCnpj: '',
            account: null,
            accountOwner: null,
            accountOwnerCpf: null,
            agency: null,
            bank: null,
            pix: null
        },
        salesValue: "0.00",
        status: 1,
        storeId: 1,
        updatedAt: "",
        userId: 0,
        value: "0.00",
    };

    var salesInfos = {
        qtd: 0
    }

    var getPayment = function(id) {
        ws.getPaymentDetails(id).then(function(response){
            Object.assign(payment, response.data);
            Object.assign(salesInfos, countSalesInfos());
        }).catch(utils.handleGenericError);
    }

    var countSalesInfos = function() {
        var obj = {
            qtd: 0,
            productsValue: 0,
            salesValues: 0
        };
        for(var i=0; i < payment.sales.length; i++) {
            obj.qtd += payment.sales[i].qtd;
        }
        return obj;
    }

    var setPaymentStatus = function(status) {
        var pay = payment;
        ws.changePaymentStatus(payment.id, {status}).then(
            function(response) {
                console.log(response.data);
                pay.status = status;
            }
        ).catch(utils.handleGenericError);
    }

    var print = function() {
        window.print();
    }

    return {
        payment,
        salesInfos,
        countSalesInfos,
        getPayment,
        print,
        setPaymentStatus
    }
})();