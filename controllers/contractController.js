window.divulgadores.controllers.ContractController = (function(){
    
    var contract = {
        id: "",
        content: "",
        helpPage: "",
        trainingPage: "",
        contentEditable: "",
        helpEditable: "",
        trainingEditable: "",
        updatedAt: "" 
    }

    var isEditing = false;

    var toggleEdit = function() {
        this.isEditing = !this.isEditing;
    }

    var getContract = function() {
        var storeId = auth.getTokenData().s;
        var temp = this.contract;
        ws.getContract(storeId).then(
            function(response) {
                Object.assign(temp, response.data);
                temp.contentEditable = temp.content;
                temp.trainingEditable = temp.trainingPage;
                temp.helpEditable = temp.helpPage
            }
        )
    }

    var edit = function() {
        this.toggleEdit();
    }

    var cancelEdit = function() {
        this.contract.contentEditable = this.contract.content;
        this.toggleEdit();
    }

    var save = function() {
        var tempContract = this.contract;
        var payload = {
            status: tempContract.status,
            content: tempContract.contentEditable,
            trainingPage: tempContract.trainingEditable,
            helpPage: tempContract.helpEditable,
        }
        tempContract.content = tempContract.contentEditable;
        tempContract.helpPage = tempContract.helpEditable;
        tempContract.trainingPage = tempContract.trainingEditable;
        this.toggleEdit();
        ws.changeContract(this.contract.id, payload).then(
            function (response) {       
            }
        ).catch(
            function (err) {
                console.error(err);
                window.alert("Erro ao salvar contrato. Tente novamente mais tarde");
            }
        )
    }

    return {
        contract,
        isEditing,
        toggleEdit,
        getContract,
        edit,
        cancelEdit,
        save
    };
})();