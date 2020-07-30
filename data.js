'use strict';
window.data = (function(){
    
    let user = {
        token: '',
        isAutheticated: function () {
            return this.token != '' 
        }
    } 

    function getUser() {
        return user
    }
    
    return {
       getUser
    }
})()