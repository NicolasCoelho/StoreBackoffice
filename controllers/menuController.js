window.app.controllers.MenuController = (function(){
    
    var changeScreen = function($event) {
        var target = $event.target;
        var menu = $event.target.parentElement.parentElement;
        var list = menu.querySelectorAll('li a');
        list.forEach(element => {
            element.classList.remove('active');
        });
        target.classList.toggle('active');
    }

    var checkCurrentRoute = function(route) {
        return route === window.location.href.split('#')[1]
    }
    
    return {
        changeScreen,
        checkCurrentRoute
    }
})();