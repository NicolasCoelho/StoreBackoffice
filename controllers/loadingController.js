window.app.controllers.LoadingController = (function(){
    
    var loading = false;

    var startLoad = function() {
        loading = true;
    };

    var stopLoad = function() {
        loading = false;
    };

    var toogleLoad = function () {
        loading = !loading;
    };

    var isLoading = function(){
        return loading;
    };
    
    return {
        isLoading,
        startLoad,
        stopLoad,
        toogleLoad
    };
})();