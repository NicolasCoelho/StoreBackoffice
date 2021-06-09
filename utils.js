var utils = (function(){
    
    var formatUserStatus = function (status) {
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

    var formatStoreStatus = function (status) {
        switch(status) {
            case 1: 
                return "Ativo"
            case 2: 
                return "Em Manutenção"
            case 3: 
                return "Desabilitado"
            default:
                return "?" 
        }
    }

    var formatPaymentsStatus = function(status) {
        switch(status) {
            case 1: 
                return "Pendente"
            case 2: 
                return "Pago"
            case 3: 
                return "Em análise"
            case 4:
                return "Bloqueado"
            default:
                return "?" 
        }
    }

    var formatCpfCnpj = function(value) {
        return value.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/,"$1.$2.$3-$4");
    }

    var formatDate = function(date) {
        if (date === null) return "Não disponivel";
        return new Date(date).toLocaleString().slice(0,10);
    }

    var formatCurrency = function(value) {
        return "R$ "+ value.toString().replace('.',',')
    }

    var handleGenericError = function(err) {
        console.error(err);
        window.alert("Erro inesperado. Tente novamente mais tarde!");
    }

    var tokenVerifier = function () {
        setInterval(() => {
            if(auth.isTokenExpired()) {
                window.location.reload();
            }
        }, 5000);
    }
    
    return {
        formatUserStatus,
        formatStoreStatus,
        formatPaymentsStatus,
        formatCpfCnpj,
        formatDate,
        formatCurrency,
        handleGenericError,
        tokenVerifier
    }
})();