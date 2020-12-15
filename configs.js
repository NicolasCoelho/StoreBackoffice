'use strict';
window.app = (function(){
    return { 
        configs:  {
            appTitle: 'Divulgadores',
            name: 'Ecomlab',
            staticUrl: 'http://localhost:5500/',
            url: 'https://www.ecomlab.com.br',
            storeToken: 1,
            home: 'http://127.0.0.1:5500/pages/home.html',
            favicon:'styles/images/logo-ecomlab.png',
            logo: {
                src: 'http://tatianaloureiro.com.br/custom/content/themes/TatianaLoureiro/Imagens/logo-tatiana-loureiro.png',
                width: 250,
                height: 60
            },
            styleVars: 'styles/css/vars.css'
        },
        controllers: {}
    }
})();