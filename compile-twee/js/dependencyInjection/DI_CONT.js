"use strict";

(function() {



let setParameters = () => ({
    subGames: {
		MM: 'Úvodní menu',
		VS: 'VolnoSnění',
		TT: 'TěloTaj',
		EX: 'Experimenty'
	},

    htmlIds: {
        myHeader: {
            givenPassageTitle: 'PassageHeader',
            id: 'my-header',
            origin: 'the passage PassageHeader is automatically wrapped into div#my-header by my SugarcubeConfigurator via Config.passages.onProcess',
        },
        myFooter: {
            givenPassageTitle: 'PassageFooter',
            id: 'my-footer',
            origin: 'the passage PassageFooter is automatically wrapped into div#my-footer by my SugarcubeConfigurator via Config.passages.onProcess',
        },
        ajaxLoadSuperAnimation: {
            id: 'ajax-anim-right',
            origin: 'via htmler.getAjaxLoadSuperAnimationId() returned to the PassageFooter template',
            purpose: 'the ajax-loader inside makes very right narrow column being position fixed and thus always on display - to always indicate, whether ajax loading is ongoing'
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
        autoWrapping: {
            passageContent: {
                defaultClass: 'my-passage'
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
            },
            UIBarToggleButton: {
                defaultClass: 'uibar-toggle-btn'
            }
        }
    }
});

let configurateIt = () => ({
    /** boolean */
    productionRelease: false,
    /** string MUST ALSO CHANGE in NETTE DownloadPresenter->actionDefault() IN THE NAME FOR DOWNLOAD FORCED FILE */
    appVersion: '0.2.0c', //MUST ALSO CHANGE in NETTE DownloadPresenter->actionDefault()
    /** integer */
    savesVersion: 1,
    /** intiger greater than 0 of turn where autosaves begin,
    or boolean false to disallow autosaves at all*/
    autosavesBeginTurn: 4
});

setup.DI_CONT = {
    params: setParameters(),
    configs: configurateIt(),
    services: [],
    getService: function(service){
        if(!this.services[service]) {
            //console.log(`DI_CONT... Create service: ${service}`);
            this.services[service] = this.createF7s[service].call(setup.DI_CONT);
        }
        return this.services[service];
    },
    /**
     * all createF7s all called automatically via DI_CONT.getService() method,
     * the THIS variable during auto call is not pointed to createF7s, but is pointed to DI_CONT itself
     */
    createF7s: {
        ajaxAnimation: function() {
            return new setup.c10s.AjaxAnimation(

            );},
        app: function() {
            return new setup.c10s.App(
                this.configs.productionRelease,
                this.configs.appVersion,
                State,
                this.params.subGames,
                this.getService('myPage')
            );},
        czechLang: function() {
            return new setup.c10s.CzechLang(

            );},
        htmler: function() {
            return new setup.c10s.Htmler(
                this.params.htmlIds,
                this.params.htmlClasses,
                UIBar
            );},
        metaDater: function() {
            return new setup.c10s.MetaDater(
                State
            );},
        myPage: function() {
            return new setup.c10s.MyPage(
                this.getService('metaDater'),
                Dialog,
                Story,
                UIBar,
                this.getService('htmler')
            );},
        sugarcubeConfigurator: function() {
            return new setup.c10s.SugarcubeConfigurator(
                State,
                this.getService('metaDater'),
                this.getService('htmler'),
                this.getService('app'),
                this.configs.autosavesBeginTurn,
                this.configs.savesVersion
            );},
    }
};



})()