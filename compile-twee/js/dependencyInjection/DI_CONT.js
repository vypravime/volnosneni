"use strict";

(function() {



let setParameters = () => ({
    subGames: {
		MM: 'Úvodní menu',
		VS: 'VolnoSnění',
		TT: 'TěloTaj',
		EX: 'Experimenty'
	},
    eventNames: {
        devModeChange: 'app:devModeChange'
    },
    cssIds: {

    },
    cssClasses: {

    }
});

let configurateIt = () => ({
    /** boolean */
    productionRelease: false,
    /** string */
    appVersion: '0.2.0b',
    /** integer */
    savesVersion: 1,
    /** intiger greater than 0 of turn where autosaves begin,
    or boolean false to disallow autosaves at all*/
    autosavesBeginTurn: 3
});

setup.DI_CONT = {
    params: setParameters(),
    configs: configurateIt(),
    services: [],
    getService: function(service){
        if(!this.services[service]) {
            console.log(`DI_CONT... Create service: ${service}`);
            this.services[service] = this.createF7s[service].call(setup.DI_CONT);
        }
        return this.services[service];
    },
    createF7s: {
        ajaxAnimation: function() {
            return new setup.c10s.AjaxAnimation(

            );},
        app: function() {
            return new setup.c10s.App(
                State,
                this.params.subGames,
                this.params.eventNames
            );},
        sugarcubeConfigurator: function() {
            return new setup.c10s.SugarcubeConfigurator(
                State,
                this.getService('metaDater'),
                this.configs.autosavesBeginTurn,
                this.configs.savesVersion
            );},
        metaDater: function() {
            return new setup.c10s.MetaDater(
                State
            );}
    }
};



})()