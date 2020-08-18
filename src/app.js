(function(){
    /*
    Vue.component('app-header', function(resolve,reject){
        fetch('./components/header.html')
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
    })
    */
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }
    const Register = { template: '<div>cadastro</div>' }
    const Dashboard = { template: '<div>Dash</div>' }
     
    const routes = [
        { path: '/', component: Foo },
        { path: '/login', component: Bar },
        { path: '/cadastro', component: Register },
        { path: '/dashboard', component: Dashboard , meta: { requiresAuth: true } }
    ]

    const router = new VueRouter({
        routes
    })

    var auth = {
        loggedIn: () => {
            return false;
        }
    }

    router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (!auth.loggedIn()) {
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

    const app = new Vue({
        router
    }).$mount('#app')
     
})();