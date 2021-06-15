(function(){
    // Configs
    var configs = window.divulgadores.configs
    
    // Ws
    if(window.ws === null || window.ws === undefined || typeof(window.ws) !== 'object') {
        window.ws = new Ws(axios);
    }

    //Import controllers
    var loginController = new Object();
    var registerController = new Object();
    var loadingController = new Object();
    var menuController = new Object();
    var modalController = new Object();
    var usersListController = new Object();
    var userController = new Object();
    var contractController = new Object();
    var configsController = new Object();
    var storeController = new Object();
    var requirementsController = new Object();
    var linksGeneratorController = new Object();
    var salesListController = new Object();
    var paymentsListController = new Object();
    var paymentController = new Object();
    var passwordRecoveryController = new Object();

    Object.assign(loginController, window.divulgadores.controllers.LoginController);
    Object.assign(registerController, window.divulgadores.controllers.RegisterController);
    Object.assign(loadingController ,window.divulgadores.controllers.LoadingController);
    Object.assign(menuController, window.divulgadores.controllers.MenuController);
    Object.assign(modalController, window.divulgadores.controllers.ModalController);
    Object.assign(usersListController, window.divulgadores.controllers.UsersListController);
    Object.assign(userController, window.divulgadores.controllers.UserController);
    Object.assign(contractController, window.divulgadores.controllers.ContractController);
    Object.assign(configsController, window.divulgadores.controllers.ConfigsController);
    Object.assign(storeController, window.divulgadores.controllers.StoreController);
    Object.assign(requirementsController, window.divulgadores.controllers.RequirementsController);
    Object.assign(linksGeneratorController, window.divulgadores.controllers.LinksGeneratorController);
    Object.assign(salesListController, window.divulgadores.controllers.SalesListController);
    Object.assign(paymentsListController, window.divulgadores.controllers.PaymentsListController);
    Object.assign(paymentController, window.divulgadores.controllers.PaymentController);
    Object.assign(passwordRecoveryController, window.divulgadores.controllers.PasswordRecoveryController);

    // Import components 
    var componentsRequests = [];
    var headerComponent, loginBoxComponent, registerFormComponent,
    menuComponent, cardComponent, linksGeneratorComponent, generatorInfoComponent,
    loadingComponent, modalComponent, contractComponent, storeComponent, 
    requirementsComponent, salesStatusComponent;

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

        axios(ws.staticUrl+'components/contract/contract.html')
        .then(function(res){contractComponent=res.data}),
        
        axios(ws.staticUrl+'components/store/store.html')
        .then(function(res){storeComponent=res.data}),

        axios(ws.staticUrl+'components/requirements/requirements.html')
        .then(function(res){requirementsComponent=res.data}),

        axios(ws.staticUrl+'components/modal/modal.html')
        .then(function(res){modalComponent=res.data})
    ];

    // Import pages async
    var pagesRequests;
    var homePage = {
        data: function() {
            return {
                configs: configs,
                auth: auth,
                utils: utils,
                openAnw: function(anw) {
                    document.querySelector(anw).classList.toggle('display-question');
                }
            }
        }
    }; 
    var registerPage = {};
    var loginPage = {};
    var dashboardPage = {};
    var notFoundPage = {};
    var dashboardHomePage = {
        data: function () {
            return {
                isAdmin: auth.isAdmin
            }
        }
    };
    var dashboardReportsPage = {
        data: function () {
            return {
                controller: salesListController
            }
        },
        beforeMount: function() {
            salesListController.getSales();
        }
    };
    var dashboardLinksGeneratorPage = {};
    var dashboardTrainingPage = {
        data: function() {
            return {
                controller: contractController,
                user: auth
            }
        }
    };
    var dasboardHelpPage = {
        data: function() {
            return {
                controller: contractController,
                user: auth
            }
        }
    };
    var dashboardChangePasswordPage = {};
    var dashboardCustumerDataPage = {};
    var dashboardContractPage = {
        data: function() {
            return {
                controller: contractController,
                user: auth
            }
        }
    };
    var dashboardConfigsPage = {
        data: function() {
            return {
                controller: configsController
            }
        }, 
        beforeMount: function () {
            configsController.setInitialPage();
        } 
    };
    var dashboardUsersListPage = {
        data: function(){
            return {
                controller: usersListController,
                formatCpfCnpj: userController.formatCpfCnpj,
                formatDate: userController.formatDate,
                formatStatus: userController.formatStatus
            }
        },
        beforeMount: function () {
            usersListController.getUsers();
        } 
    };
    var dashboardUserPage = {
        data: function() {
            return {
                controller: userController,
                auth: auth
            }
        },
        beforeMount: function () {
            userController.getUserData(this.$route.params.id, registerController);
        } 
    };
    var dashboardPaymentsListPage = {
        data: function() {
            return {
                controller: paymentsListController,
                utils: utils
            }
        },
        beforeMount: function() {
            paymentsListController.getPayments();
        }
    };
    var dashboardPaymentPage = {
        data: function() {
            return {
                controller: paymentController,
                utils: utils,
                auth: auth
            }
        },
        beforeMount: function() {
            paymentController.getPayment(this.$route.params.id)
        }
    }
    var passwordRecoveryPage = {
        data: function() {
            return {
                controller: passwordRecoveryController,
                loading: loadingController
            }
        },
        beforeMount: function() {
            passwordRecoveryController.setRecoveryToken(this.$route.params.token);
        }
    };
    
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

        axios(ws.staticUrl+'pages/dashboard/paymentsList.html')
        .then(function(page){dashboardPaymentsListPage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/payment.html')
        .then(function(page){dashboardPaymentPage.template=page.data}),

        axios(ws.staticUrl+'pages/passwordRecovery.html')
        .then(function(page){passwordRecoveryPage.template=page.data}),

        axios(ws.staticUrl+'pages/dashboard/configs.html')
        .then(function(page){dashboardConfigsPage.template=page.data}),        
        
        axios(ws.staticUrl+'pages/404.html')
        .then(function(page){notFoundPage.template=page.data}),
    ];
        
    function init() {
        // Set components
        Vue.component('app-header', {
            data: function() {
                return {
                    currentRoute: window.location.href.split('#')[1],
                    logOut: auth.logOut,
                    myAccount: function (router) {
                        router.replace('/dashboard');
                    },
                    goToHome: function() {
                        router.replace('/');
                    },
                    isAuthenticaded: auth.isAuthenticaded,
                    user: auth.getTokenData,
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
                    configs: configs,
                    controller: loginController
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
            mounted: function () {
                registerController.renderHCaptcha();
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
                    controller: linksGeneratorController
                }
            },
            beforeMount: function () {
                linksGeneratorController.getShareInfos();
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
        Vue.component('app-contract', {
            props: ['type'],
            data: function() {
                return {
                    controller: contractController
                }
            },
            beforeMount: function () {
                contractController.getContract();
            },
            template: contractComponent
        })
        Vue.component('app-store', {
            data: function() {
                return {
                    controller: storeController,
                    utils: utils,
                    loading: loadingController,
                }
            },
            beforeMount: function () {
                storeController.getStore();
            },
            template: storeComponent
        });
        Vue.component('app-requirements', {
            data: function() {
                return {
                    controller: requirementsController,
                    loading: loadingController,
                }
            },
            beforeMount: function () {
                requirementsController.getRequirements();
            },
            template: requirementsComponent
        });
        
        var routes = [
            { path: '/', component: homePage,
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
            { path: '/recuperar-senha/:token', component: passwordRecoveryPage },
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
                    { path: 'pagamentos', component: dashboardPaymentsListPage },
                    { path: 'pagamento/:id', component: dashboardPaymentPage },
                    { path: 'gerador-de-links', component: dashboardLinksGeneratorPage },
                    { path: 'material-de-treinamento', component: dashboardTrainingPage },
                    { path: 'dados-cadastrais/:id', component: dashboardUserPage, props: true },
                    { path: 'alterar-senha', component: dashboardChangePasswordPage },
                    { path: 'contrato', component: dashboardContractPage },
                    { path: 'ajuda', component: dasboardHelpPage },
                    { path: 'configuracoes', component: dashboardConfigsPage },
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
            mode: "hash",
            routes
        });

        // Set Token
        if (!auth.hasToken() || (auth.hasToken() && !auth.isEmptyTokenValid() )) {
            ws.getToken().then(
                function(response){
                    auth.setToken(response.data.token);
                    var app = new Vue({
                        router
                    }).$mount('#app');
                    utils.tokenVerifier();
                }
            ).catch(
                function(err){
                    var errorMessage = "<h1 style='text-align: center; color: var(--primary);'>Erro na ativaçao do site. Por favor, contate o suporte!</h1>"
                    if (err.response.status == 404) {
                        document.querySelector("#app").innerHTML = errorMessage;
                    } else {
                        document.querySelector("#app").innerHTML = '';
                        window.alert("Erro inesperado. Por favor tente mais tarde");
                        window.location.reload();
                    }
                    console.error(err);
                }
            );
        } else {
            var app = new Vue({
                router
            }).$mount('#app');
            utils.tokenVerifier();
        }
    } 

    // Start app after download all pages
    var importsRequests = componentsRequests.concat(pagesRequests);
    Promise.all(importsRequests).then( (complete) => {
        init();
    }).catch( (error) => {
        console.log("Pages Download error", error);
        alert("Erro de conexão... Tente mais tarde!");
    })
})();