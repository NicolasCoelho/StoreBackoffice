window.divulgadores.app.controllers.MenuController = (function(){
    
    var changeScreen = function($event) {
        var target = $event.target;
        var menu = $event.target.parentElement.parentElement;
        var list = menu.querySelectorAll('li a');
        list.forEach(element => {
            element.classList.remove('active');
        });
        target.classList.toggle('active');
        closeMenuMobile();
    }

    var checkCurrentRoute = function(route) {
        return route === window.location.href.split('#')[1]
    }

    var toggleMobileMenu = function() {
        document.querySelector("#MenuComponent nav").classList.toggle('menuOpened');
    }

    var closeMenuMobile = function() {
        document.querySelector("#MenuComponent nav").classList.remove('menuOpened');
    }
    
    return {
        changeScreen,
        checkCurrentRoute,
        toggleMobileMenu,
        closeMenuMobile
    }
})();