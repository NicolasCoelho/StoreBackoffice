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

    var formatCpfCnpj = function(value) {
        return value.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})$/,"$1.$2.$3-$4");
    }

    var formatDate = function(date) {
        return new Date(date).toLocaleString().slice(0,10);
    }
    
    return {
        formatUserStatus,
        formatStoreStatus,
        formatCpfCnpj,
        formatDate,
    }
})();