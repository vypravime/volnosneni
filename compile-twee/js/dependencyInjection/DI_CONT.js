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
    htmlIds: {
        'my-header': {
            origin: 'the passage PassageHeader is automatically wrapped into div#my-header by my SugarcubeConfigurator via Config.passages.onProcess'
        },
        'my-footer': {
            origin: 'the passage PassageFooter is automatically wrapped into div#my-footer by my SugarcubeConfigurator via Config.passages.onProcess'
        },
        'ajax-anim-right': {
            origin: 'manually added in the PassageFooter template',
            purpose: 'the ajax-loader inside makes very right position fixed narrow column being always on display - to always indicate, whether ajax loading is ongoing'
        }
    },
    htmlClasses: {
        passageTags: {
            alignCenter: {
                class:'aligncenter',
                purpose: 'for css text-align: center styling'
            },
            noAutoWrapDiv: {
                class: '',
                purpose: 'This passage is not wrapped into div.my-passage by my SugarcubeConfigurator via Config.passages.onProcess'
            }
        },
        animations: {
            ajaxLoader: {
                defaultClass: 'ajax-anim-1'
            }
        },
        components: {
            togglableButtonsGroup: {
                defaultClass: 'see-saw',
                withDefaultUsages: {
                    devModeToggles: {
                        class: 'dev-mode-toggle-btns',
                        eventNameKey: 'devModeChange'
                    }
                }
            }
        }
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
            );},
        czechLang: function() {
            return new setup.c10s.CzechLang(

            );}
    }
};



})()