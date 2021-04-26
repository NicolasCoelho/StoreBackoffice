window.divulgadores.app.controllers.LinksGeneratorController = (function(){
    
    var infos = {
        publicId: "",
        url: "" 
    };

    var inputs = {
        url: "",
        targetUrl: "",
    };

    var messageFeedback = {m: ""};

    var urlId = "partner";


    var getShareInfos = function() {
        var userId = auth.getTokenData().u;
        ws.getUserShareInfos(userId).then(
            function (response) {
                Object.assign(infos, response.data);
            }
        ).catch(
            function(err) { 
                console.error(err);
                window.alert("Erro inesperado! Tente novamente mais tarde!");
            }
        )
    }

    var generateUrl = function() {
        if (inputs.url === '') { 
            this.setMessage('Insira uma Url');
            return; 
        }
        
        if (inputs.url.indexOf(infos.url) === -1) {
            this.setMessage('A url precisa pertencer a '+infos.url );
            return;
        }

        if(inputs.url.indexOf("partner=") !== -1) {
            this.setMessage('A url já possui seu link de divulgaçao!');
            return;
        }
        
        var parsedUtm = urlId+'='+infos.publicId;
        
        parsedUtm = inputs.url.indexOf('?') != -1 ? '&'+parsedUtm : '?'+parsedUtm;

        var finalUrl = inputs.url + parsedUtm;
        
        inputs.targetUrl = finalUrl;
    }

    var copyUrl = function() {
        if (inputs.url === '') {
            this.setMessage("Insira uma Url");
        }
        var targetUrl = document.querySelector("#targetUrl");
        targetUrl.select();
        targetUrl.setSelectionRange(0, 99999);
        document.execCommand("copy");
        this.setMessage('Link copiado com sucesso!');
    }

    var shortUrl = function() {
        window.open('https://bitly.com');
    }
    
    function setMessage(msg, timer=true) {
        var temp = this.messageFeedback;
        temp.m = msg;
        if (timer) {
            setTimeout(function() {
                temp.m = '';	
            }, 3000);
        } 
    }

    return {
        infos,
        inputs,
        messageFeedback,
        urlId,
        getShareInfos,
        generateUrl,
        copyUrl,
        shortUrl,
        setMessage
    }
})();