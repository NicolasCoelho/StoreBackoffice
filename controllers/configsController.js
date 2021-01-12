window.app.controllers.ConfigsController = (function(){

    var page = 1;

    var changeUserView = function($event, newPage) {
        this.page = newPage;
        $event.target.parentElement.querySelectorAll('li').forEach(function(ele){ele.classList.remove('selected')});
        $event.target.classList.toggle('selected');
    }

    var setInitialPage = function() {
        this.page = 1;
    }

    return {
        page,
        changeUserView,
        setInitialPage
    }
})();