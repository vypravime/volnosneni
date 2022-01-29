"use strict";

(function() {

let configurateIt = function() {
    return {
        
    };
};

setup.DI_CONT = {
    configs: configurateIt(),
    services: [],
    getService: function(service){
        if(!this.services[service]) {
            console.log(`DI_CONT... Create service: ${service}`);
            this.services[service] = this.createF7s[service]();
        }
        return this.services[service];
    },
    createF7s: {
        ajaxAnimation: () => new setup.c10s.AjaxAnimation(
            
        )
    }
};



})()