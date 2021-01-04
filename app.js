(function(){
    // Configs
    var configs = window.app.configs

    //Import controllers
    var loginController = new Object();
    var registerController = new Object();
    var loadingController = new Object();
    var menuController = new Object();
    var modalController = new Object();
    var usersListController = new Object();
    var userController = new Object();
    Object.assign(loginController, window.app.controllers.LoginController);
    Object.assign(registerController, window.app.controllers.RegisterController);
    Object.assign(loadingController ,window.app.controllers.LoadingController);
    Object.assign(menuController, window.app.controllers.MenuController);
    Object.assign(modalController, window.app.controllers.ModalController);
    Object.assign(usersListController, window.app.controllers.UsersListController);
    Object.assign(userController, window.app.controllers.UserController);
    // Import components 
    var componentsRequests = [];
    var headerComponent, loginBoxComponent, registerFormComponent,
    menuComponent, cardComponent, linksGeneratorComponent, generatorInfoComponent,
    loadingComponent, modalComponent;

    componentsRequests = [
        axios(ws.staticUrl+'components/header/header.html')
        .then(function(res){headerComponent=res.data}),
        
        axios(ws.staticUrl+'components/loginBox/loginBox.html')
        .then(function(res){loginBoxComponent=res.data}),
        
        axios(ws.staticUrl+'components/registerForm/registerForm.html')
        .then(function(res){registerFormComponent=res.data}),

        axios(ws.staticUrl+'components/menu/menu.html')
        .then(function(res){menuComponent=res.data}),
        
        axios(ws.staticUrl+'components/card/card.html')
        .then(function(res){cardComponent=res.data}),

        axios(ws.staticUrl+'components/linksGenerator/linksGenerator.html')
        .then(function(res){linksGeneratorComponent=res.data}), 
        
        axios(ws.staticUrl+'components/generatorInfo/generatorInfo.html')
        .then(function(res){generatorInfoComponent=res.data}), 
        
        axios(ws.staticUrl+'components/loading/loading.html')
        .then(function(res){loadingComponent=res.data}),

        axios(ws.staticUrl+'components/modal/modal.html')
        .then(function(res){modalComponent=res.data})
    ];

    // Import pages async
    var pagesRequests;
    var homePage = {}; 
    var registerPage = {};
    var loginPage = {};
    var dashboardPage = {};
    var notFoundPage = {};
    var dashboardHomePage = {};
    var dashboardReportsPage = {};
    var dashboardLinksGeneratorPage = {};
    var dashboardTrainingPage = {};
    var dasboardHelpPage = {};
    var dashboardChangePasswordPage = {};
    var dashboardCustumerDataPage = {};
    var dashboardContractPage = {};
    var dashboardUsersListPage = {
        data: function(){
            return {
                controller: usersListController
            }
        },
        beforeMount: function () {
            usersListController.getUsers();
        } 
    };
    var dashboardUserPage = {
        data: function() {
            return {
                controller: userController
            }
        },
        beforeMount: function () {
            userController.getUserData(this.$route.params.id, registerController);
        } 
    }
    
    pagesRequests = [
        axios(configs.home || ws.staticUrl+'./pages/home.html')
        .then(function(page){homePage.template=page.data}),
            
        axios(ws.staticUrl+'pages/register.html')
        .then(function(page){registerPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/login.html')
        .then(function(page){loginPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard.html')
        .then(function(page){dashboardPage.template=page.data}),
                
        axios(ws.staticUrl+'pages/dashboard/dash.html')
        .then(function(page){dashboardHomePage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/reports.html')
        .then(function(page){dashboardReportsPage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/linksGenerator.html')
        .then(function(page){dashboardLinksGeneratorPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard/changePassword.html')
        .then(function(page){dashboardChangePasswordPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard/contract.html')
        .then(function(page){dashboardContractPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard/customerData.html')
        .then(function(page){dashboardCustumerDataPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard/help.html')
        .then(function(page){dasboardHelpPage.template=page.data}),
        
        axios(ws.staticUrl+'pages/dashboard/training.html')
        .then(function(page){dashboardTrainingPage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/users.html')
        .then(function(page){dashboardUsersListPage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/user.html')
        .then(function(page){dashboardUserPage.template=page.data}),        
        
        axios(ws.staticUrl+'pages/404.html')
        .then(function(page){notFoundPage.template=page.data}),
    ];

    // Start app after download all pages
    var importsRequests = componentsRequests.concat(pagesRequests);
    Promise.all(importsRequests).then( (complete) => {
        init();
    }).catch( (error) => {
        console.log("Pages Download error", error);
        alert("Erro de conexão... Tente mais tarde!");
    })
        
    function init() {
        // Set Directives
        Vue.directive('mask', VueMask.VueMaskDirective);

        // Set components
        Vue.component('app-header', {
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1],
                    logOut: auth.logOut,
                    configs: configs
                }
            },
            template: headerComponent
        });
        Vue.component('app-loginBox',{
            data: function() {
                return {
                    formInputs: loginController.formInputs,
                    loading: loadingController,
                    configs: configs
                }
            },
            methods: {
                submit: loginController.submit,
            },
            template: loginBoxComponent
        });
        Vue.component('app-registerForm', {
            data: function() {
                return {
                    controller: registerController,
                    formInputs: registerController.formInputs,
                    optionsLists: registerController.optionsLists,
                    modal: modalController,
                    loading: loadingController,
                }
            },
            methods: {
                cadastrar: registerController.cadastrar
            },
            beforeMount: function () {
                registerController.getUserRequirements();
            },
            template: registerFormComponent   
        });
        Vue.component('app-menu', {
            data: function() {
                return {
                    menu: menuController,
                    user: auth
                }
            },
            template: menuComponent
        });
        Vue.component('app-card', {
            props: ['icon', 'title', 'value', 'foot','time'],
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1]
                }
            },
            template: cardComponent
        });
        Vue.component('app-linksGenerator', {
            props: ['baseUrl'],
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1]
                }
            },
            template: linksGeneratorComponent
        });
        Vue.component('app-generatorInfo', {
            props: ['url'],
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1]
                }
            },
            template: generatorInfoComponent
        });
        Vue.component('app-loading', {
            data: function() {
                return {
                    loading: loadingController
                }
            },
            template: loadingComponent
        });
        Vue.component('app-modal', {
            data: function() {
                return {
                    modal: modalController
                }
            },
            template: modalComponent
        });
        
        var routes = [
            { path: '/', component: homePage },
            { path: '/cadastro', component: registerPage,
                beforeEnter: function(to,from,next){
                    if (auth.isAuthenticaded()) {
                        next({
                            path: '/dashboard',
                            query: { redirect: to.fullPath }
                        })
                    } else {
                        next();
                    }
                }  
            },
            { path: '/entrar', component: loginPage,
                beforeEnter: function(to,from,next){
                    if (auth.isAuthenticaded()) {
                        next({
                            path: '/dashboard',
                            query: { redirect: to.fullPath }
                        })
                    } else {
                        next();
                    }
                }  
            },
            { path: '/dashboard', component: dashboardPage ,
                children: [
                    { path: '', component: dashboardHomePage },
                    { path: 'relatorios', component: dashboardReportsPage },
                    { path: 'gerador-de-links', component: dashboardLinksGeneratorPage },
                    { path: 'material-de-treinamento', component: dashboardTrainingPage },
                    { path: 'dados-cadastrais', component: dashboardCustumerDataPage },
                    { path: 'alterar-senha', component: dashboardChangePasswordPage },
                    { path: 'contrato', component: dashboardContractPage },
                    { path: 'ajuda', component: dasboardHelpPage },
                    { path: 'usuarios', component: dashboardUsersListPage },
                    { path: 'usuario/:id', component: dashboardUserPage, props: true }
                ],
                beforeEnter: function(to,from,next){
                    if (!auth.isAuthenticaded()) {
                        next({
                            path: '/entrar',
                            query: { redirect: to.fullPath }
                        })
                    } else {
                        next();
                    }
                }
            },
            { path: '**', component: notFoundPage }
        ];
    
        var router = new VueRouter({
            routes
        });

        // Set Token
        if (!auth.hasToken() || (auth.hasToken() && !auth.isEmptyTokenValid() )) {
            ws.getToken().then(
                function(response){
                    auth.setToken(response.data.token)
                }
            ).catch(
                function(err){
                    var errorMessage = "<h1 style='text-align: center; color: var(--primary);'>Erro na ativaçao do site. Por favor, contate o suporte!</h1>"
                    if (err.response.status == 404) {
                        document.querySelector("#app").innerHTML = errorMessage;
                    } else {
                        document.querySelector("#app").innerHTML = '';
                        window.alert("Erro inesperado. Por favor tente mais tarde");
                    }
                    console.error(err);
                }
            );
        }
        var app = new Vue({
            router
        }).$mount('#app');
    } 
})();