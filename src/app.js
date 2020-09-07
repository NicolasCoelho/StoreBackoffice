(function(){
    //Import controllers
    var loginController = window.controllers.LoginController;
    var registerController = window.controllers.RegisterController;

    // Import components 

    var componentsRequests = [];
    var headerComponent, loginBoxComponent, registerFormComponent;

    componentsRequests = [
        axios('./components/header/header.html')
        .then(function(res){headerComponent=res.data}),
        
        axios('./components/loginBox/loginBox.html')
        .then(function(res){loginBoxComponent=res.data}),
        
        axios('./components/registerForm/registerForm.html')
        .then(function(res){registerFormComponent=res.data}),
    ];

    // Import pages async
    var pagesRequests;
    var homePage, registerPage, loginPage, dashboardPage, notFoundPage;
    
    pagesRequests = [
        axios('./pages/home.html')
            .then(function(page){homePage=page.data}),
            
        axios('./pages/register.html')
            .then(function(page){registerPage=page.data}),
        
        axios('./pages/login.html')
            .then(function(page){loginPage=page.data}),
        
        axios('./pages/dashboard.html')
            .then(function(page){dashboardPage=page.data}),

        axios('./pages/404.html')
            .then(function(page){notFoundPage=page.data}),
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
                    currentRoute: window.location.href.split('#')[1]
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

        // Set pages
        var Home = { template: homePage };
        var Register = { template: registerPage };
        var Login = { template: loginPage };
        var Dashboard = { template: dashboardPage, methods: { logOut: auth.logOut } };
        var NotFound = { template: notFoundPage };
         
        var routes = [
            { path: '/', component: Home },
            { path: '/cadastro', component: Register },
            { path: '/login', component:Login  },
            { path: '/dashboard', component: Dashboard , meta: { requiresAuth: true } },
            { path: '**', component: NotFound }
        ];
    
        var router = new VueRouter({
            routes
        });

        // Set page access controller
        router.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.requiresAuth)) {
        
                // TODO: Check for loggedIn user
                if (!auth.isLoggedIn()) {
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
                } else {
                next();
                }
            } else {
                next();
            }
        });

        var app = new Vue({
            router
        }).$mount('#app');
    } 
})();