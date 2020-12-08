window.app.controllers.LoadingController = (function(){
    
    var loading = false;

    var startLoad = function() {
        this.loading = true;
    };

    var stopLoad = function() {
        this.loading = false;
    };

    var toogleLoad = function () {
        this.loading = !this.loading;
    };

    var isLoading = function(){
        return this.loading;
    };
    
    return {
        loading,
        isLoading,
        startLoad,
        stopLoad,
        toogleLoad
    };
})();