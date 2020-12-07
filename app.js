(function(){
    //Import controllers
    var loginController = new Object();
    var registerController = new Object();
    var loadingModalController = new Object();
    Object.assign(loginController, window.controllers.LoginController);
    Object.assign(registerController, window.controllers.RegisterController);
    Object.assign(loadingModalController ,window.controllers.LoadingModalController)
    
    // Import components 

    var componentsRequests = [];
    var headerComponent, loginBoxComponent, registerFormComponent, menuComponent, cardComponent;

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
        .then(function(res){cardComponent=res.data})
    ];

    // Import pages async
    var pagesRequests;
    var homePage, registerPage, loginPage, dashboardPage, notFoundPage,
        dashboardHomePage, dashboardReportsPage;
    
    pagesRequests = [
        axios('./pages/home.html').then(function(page){homePage=page.data}),
            
        axios('./pages/register.html').then(function(page){registerPage=page.data}),
        
        axios('./pages/login.html').then(function(page){loginPage=page.data}),
        
        axios('./pages/dashboard.html').then(function(page){dashboardPage=page.data}),
                
        axios('./pages/dashboard/dash.html').then(function(page){dashboardHomePage=page.data}),

        axios('./pages/dashboard/reports.html').then(function(page){dashboardReportsPage=page.data}),

        axios('./pages/404.html').then(function(page){notFoundPage=page.data}),
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
                    currentRoute: window.location.href.split('#')[1]
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

        // Set pages
        var Home = { template: homePage };
        var Register = { template: registerPage };
        var Login = { template: loginPage };
        var Dashboard = { template: dashboardPage, methods: { logOut: auth.logOut } };
            var DashboardHome = { template: dashboardHomePage };
            var DashboardReports = { template: dashboardReportsPage };
            
        var NotFound = { template: notFoundPage };
         
        var routes = [
            { path: '/', component: Home },
            { path: '/cadastro', component: Register },
            { path: '/login', component:Login  },
            { path: '/dashboard', component: Dashboard ,
                children: [
                    { path: '', component: DashboardHome},
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
            { path: '**', component: NotFound }
        ];
    
        var router = new VueRouter({
            routes
        });

        var app = new Vue({
            router
        }).$mount('#app');
    } 
})();