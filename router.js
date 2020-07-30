'use strict';
window.router = (function(){
    
    let current = window.location.href.split('#')
    current = current.length > 1 ? current[2] : '/'
    let history = []
    let routes = [
        {path: '/', name: 'Home', isProtected: false },
        {path: '##', name: 'Not Found', isProtected: false}
    ]

    function init(){
        const route = getRoute(current)
        if (current != '/') {
            if (route.isProtected) {
                
            }
        } else {

        }
    }
    
    function navigate() {
        window.history.pushState();
    }

    function getRoute (path) {
        let route = routes[routes.length-1]
        for (let i=0; i<routes.length; i++) {
            if (routes[i].path === path) {
                route = routes[i]
                break
            }
        }
        return route
    }

    return  {
        init,
        navigate
    }
})()