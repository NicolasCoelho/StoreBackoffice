window.app.controllers.ModalController = (function(){

    var isActive = false;
    var width = '550px';
    var height = '200px';
    var title = ''; 
    var icon = '';
    var content = '';
    var footer = '';
    var actionText = 'OK';
    
    var action = null;

    var toggle = function () {
        this.isActive = !this.isActive;
    }

    var registerComplete = function(func, isProtected) {
        this.isActive = true;
        this.setProperties(
            'Cadastro realizado com sucesso', 
            'fa fa-check circle', 
            isProtected ? 'Aguarde nossa analise' : 'Você já pode começar a vender e ganhar suas comissões!',
            isProtected ? 'Ir para o painel' : 'Entendi',
            func
        )
    }

    var setProperties = function(t, i='', c, a, ac, f='') {
        this.title = t;
        this.icon = i;
        this.content = c
        this.actionText = a
        this.action = ac;
        this.footer = f
    }

    return {
        isActive,
        width,
        height,
        title,
        icon,
        content,
        footer,
        actionText,
        setProperties,
        registerComplete,
        toggle
    }
})();