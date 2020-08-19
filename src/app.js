(function(){
    // Import components 
    Vue.component('app-header', function(resolve,reject){
        fetch('./src/components/header.html')
        .then((res)=> {return res.text()})
        .then((res)=>{
            resolve({
                data: function() {
                    return {
                        message: "Welcome to my first VueJs App"
                    }
                },
                template: res  
            })
        }).catch(()=>{return reject()})     
    });

    // Import pages async
    var pagesRequests;
    var homePage, registerPage, loginPage, dashboardPage;
    
    pagesRequests = [
        fetch('./src/pages/home.html')
            .then((response) => { return response.text() })
            .then(page => homePage=page),
            
        fetch('./src/pages/register.html')
            .then((response) => { return response.text() })
            .then(page => registerPage=page),
        
        fetch('./src/pages/login.html')
            .then((response) => { return response.text() })
            .then(page => loginPage=page),
        
        fetch('./src/pages/dashboard.html')
            .then((response) => { return response.text() })
            .then(page => dashboardPage=page),
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
        var Dashboard = { template: Dashboard };
         
        var routes = [
            { path: '/', component: Home },
            { path: '/cadastro', component: Register },
            { path: '/login', component:Login  },
            { path: '/dashboard', component: Dashboard , meta: { requiresAuth: true } }
        ]
    
        var router = new VueRouter({
            routes
        })
        
        /*
        // Set page access controller
        router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
    
            // TODO: Check for loggedIn user
            if (auth.isLoggedIn()) {
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
        })
        */
        var app = new Vue({
            router
        }).$mount('#app')
    } 
})();