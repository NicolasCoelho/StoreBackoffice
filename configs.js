window.app = (function(){
    return { 
        configs:  {
            appTitle: 'Divulgadores',
            name: 'Ecomlab',
            /*
            staticUrl: 'https://static.divulgadores.app.br',
            wsUrl: 'https://wshlg.divulgadores.app.br',
             */
            staticUrl: 'http://localhost:5500/',
            wsUrl: 'http://localhost:3000/',
            url: 'https://www.ecomlab.com.br',
            id: "f99dbab6-e66b-4e2f-a7e8-7366d911ffb1",
            home: 'https://static.divulgadores.app.br/pages/home.html',
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