'user strict';
(function(){
    var url = window.app.configs.staticUrl;

    document.title = window.app.configs.appTitle;
    document.querySelector("link[rel='shortcut icon']").href = window.app.configs.favicon;
    addElement(window.app.configs.styleVars);

    var imports = [
        'https://cdn.jsdelivr.net/npm/vue@2.6.12',
        'https://unpkg.com/vue-router@3.4.3/dist/vue-router.js',
        'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
        'styles/css/fontAwesome/css/all.min.css',
        'styles/css/bootstrap-grid.css',
        'styles/css/app.css',
        'controllers/loadingController.js',
        'controllers/loginController.js',
        'controllers/registerController.js',
        'controllers/menuController.js',
        'controllers/modalController.js',
        'controllers/usersListController.js',
        'controllers/userController.js',
        'controllers/contractController.js',
        'controllers/configsController.js',
        'controllers/storeController.js',
        'controllers/requirementsController.js',
        'controllers/salesStatusController.js',
        'auth.js',
        'ws.js'
    ];

    var requests = [];
    for(var i=0; i<imports.length; i++) {
        requests.push(addElement(imports[i]))
    }
    Promise.all(requests).then(function(){
        addElement('app.js');
    }).catch(function(){console.log("Erro de conexão. Tente novamente mais tarde!")});

    function addElement(src) {
        return new Promise(function(resolve,reject){
            try {
                var type = src.indexOf('.js') > -1 ? 'SCRIPT' : 'LINK'; 
                var tag = document.createElement(type);
                src = src.indexOf('http') === -1 ? url+src : src;
                if (type === 'LINK') {
                    tag.setAttribute('rel', 'stylesheet');
                    tag.setAttribute('href', src);
                } else {
                    tag.setAttribute('src', src);
                }
                document.body.appendChild(tag);
                tag.addEventListener('load', ()=>{
                    resolve();
                });
            } catch(err) {
                reject(err);
            }
        });
    }
})();