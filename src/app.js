(function(){
    //Import controllers
    var loginController = window.controllers.LoginController;
    var registerController = window.controllers.RegisterController;

    // Import components 
    Vue.component('app-header', function(resolve,reject){
        fetch('./components/header/header.html')
        .then((res)=> {return res.text()})
        .then((res)=>{
            resolve({
                data: function() {
                    return {
                        currentRoute: window.location.href.split('#')[1]
                    }
                },
                template: res
            })
        }).catch(()=>{return reject()})     
    });
    Vue.component('app-loginBox', function(resolve,reject){
        fetch('./components/loginBox/loginBox.html')
        .then((res)=> {return res.text()})
        .then((res)=>{
            resolve({
                data: function() {
                    return {
                        formInputs: loginController.formInputs,
                    }
                },
                methods: {
                    submit: loginController.submit,
                },
                template: res
            })
        }).catch(()=>{return reject()})     
    });
    Vue.component('app-registerForm', function(resolve,reject){
        fetch('./components/registerForm/registerForm.html')
        .then((res)=> {return res.text()})
        .then((res)=>{
            resolve({
                data: function() {
                    return {
                        formInputs: registerController.formInputs,
                        optionsLists: registerController.optionsLists
                    }
                },
                methods: {
                    submit: registerController.submit,
                },
                template: res
            })
        }).catch(()=>{return reject()})     
    });

    // Import pages async
    var pagesRequests;
    var homePage, registerPage, loginPage, dashboardPage, notFoundPage;
    
    pagesRequests = [
        fetch('./pages/home.html')
            .then((response) => { return response.text() })
            .then(page => homePage=page),
            
        fetch('./pages/register.html')
            .then((response) => { return response.text() })
            .then(page => registerPage=page),
        
        fetch('./pages/login.html')
            .then((response) => { return response.text() })
            .then(page => loginPage=page),
        
        fetch('./pages/dashboard.html')
            .then((response) => { return response.text() })
            .then(page => dashboardPage=page),

        fetch('./pages/404.html')
            .then((response) => { return response.text() })
            .then(page => notFoundPage=page),
    ];

    // Start app after download all pages
    Promise.all(pagesRequests).then( (complete) => {
        init();
    }).catch( (error) => {
        console.log("Pages Download error", error);
        alert("Erro de conexão... Tente mais tarde!");
    })
        
    function init() {
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