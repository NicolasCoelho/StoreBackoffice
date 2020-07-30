'use strict';
window.reqs = (function(){
    function init() {
        addElementsToDom()
    }

    function addElementsToDom() {
        const main = document.createElement('MAIN')
        document.body.appendChild(main)
    }

    return {
        init
    }
})()