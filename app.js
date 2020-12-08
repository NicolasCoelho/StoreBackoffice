(function(){
    //Import controllers
    var loginController = new Object();
    var registerController = new Object();
    var loadingModalController = new Object();
    var menuController = new Object();
    Object.assign(loginController, window.controllers.LoginController);
    Object.assign(registerController, window.controllers.RegisterController);
    Object.assign(loadingModalController ,window.controllers.LoadingModalController);
    Object.assign(menuController, window.controllers.MenuController);
    
    // Import components 
    var componentsRequests = [];
    var headerComponent, loginBoxComponent, registerFormComponent,
    menuComponent, cardComponent, linksGeneratorComponent, generatorInfoComponent;

    componentsRequests = [
        axios('./components/header/header.html')
        .then(function(res){headerComponent=res.data}),
        
        axios('./components/loginBox/loginBox.html')
        .then(function(res){loginBoxComponent=res.data}),
        
        axios('./components/registerForm/registerForm.html')
        .then(function(res){registerFormComponent=res.data}),

        axios('./components/menu/menu.html')
        .then(function(res){menuComponent=res.data}),
        
        axios('./components/card/card.html')
        .then(function(res){cardComponent=res.data}),

        axios('./components/linksGenerator/linksGenerator.html')
        .then(function(res){linksGeneratorComponent=res.data}), 
        
        axios('./components/generatorInfo/generatorInfo.html')
        .then(function(res){generatorInfoComponent=res.data}), 
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
    
    pagesRequests = [
        axios('./pages/home.html')
        .then(function(page){homePage.template=page.data}),
            
        axios('./pages/register.html')
        .then(function(page){registerPage.template=page.data}),
        
        axios('./pages/login.html')
        .then(function(page){loginPage.template=page.data}),
        
        axios('./pages/dashboard.html')
        .then(function(page){dashboardPage.template=page.data}),
                
        axios('./pages/dashboard/dash.html')
        .then(function(page){dashboardHomePage.template=page.data}),

        axios('./pages/dashboard/reports.html')
        .then(function(page){dashboardReportsPage.template=page.data}),

        axios('./pages/dashboard/linksGenerator.html')
        .then(function(page){dashboardLinksGeneratorPage.template=page.data}),
        
        axios('./pages/dashboard/changePassword.html')
        .then(function(page){dashboardChangePasswordPage.template=page.data}),
        
        axios('./pages/dashboard/contract.html')
        .then(function(page){dashboardContractPage.template=page.data}),
        
        axios('./pages/dashboard/customerData.html')
        .then(function(page){dashboardCustumerDataPage.template=page.data}),
        
        axios('./pages/dashboard/help.html')
        .then(function(page){dasboardHelpPage.template=page.data}),
        
        axios('./pages/dashboard/training.html')
        .then(function(page){dashboardTrainingPage.template=page.data}),
        
        axios('./pages/404.html')
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
        // Set components
        Vue.component('app-header', {
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1],
                    logOut: auth.logOut
                }
            },
            template: headerComponent
        });
        Vue.component('app-loginBox',{
            data: function() {
                return {
                    formInputs: loginController.formInputs,
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
                    formInputs: registerController.formInputs,
                    optionsLists: registerController.optionsLists
                }
            },
            methods: {
                submit: registerController.submit
            },
            template: registerFormComponent   
        });
        Vue.component('app-menu', {
            data: function() {
                return {
                    menu: menuController
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
         
        var routes = [
            { path: '/', component: homePage },
            { path: '/cadastro', component: registerPage },
            { path: '/entrar', component: loginPage },
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
                ],
                beforeEnter: function(to,from,next){
                    if (!auth.isLoggedIn()) {
                        next({
                            path: '/login',
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

        var app = new Vue({
            router
        }).$mount('#app');
    } 
})();