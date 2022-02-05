"use strict";

(function(){



setup.c10s.SugarcubeConfigurator = function(
    _stateInstance,
    _metaDater,
    _htmler,
    _app,
    autosaveBeginTurn = 3,
    savesVersion
) {
    this._state = _stateInstance;
    this._metaDater = _metaDater;
    this._htmler = _htmler;
    this._app = _app;


    Config.passages.nobr = true;
    Config.history.controls = false;

    
    Config.saves.id = 'VypravimeApp' //you MUSTN'T EVER CHANGE THIS, SugarCube refuses to load every save made prior the change of this value
    Config.saves.version = savesVersion;
    Config.saves.autosave = ()=> {
        if (autosaveBeginTurn && (
                this._state.turns >= autosaveBeginTurn)) {
            return true;
        } else {
            return false;
        }
    }; 
    Config.saves.autoload = (()=> {
        if (this._metaDater.oneTimeCHECKAutoloadSkip()) {
            return false;
        } else {
            return "prompt";
        }
    })();
    
    
    Config.passages.onProcess = (passage)=> {
        return this._htmler.autoWrapPassageContent(passage);
    };

    /*!! NOT EXPLICITLY DECLARED DEPENDENCY ON _app SERVICE !!*/
    Config.passages.descriptions = function () {
            return setup.DI_CONT.getService('app').getBasicGameHeading(true);
    };
    


    Config.debug = (()=> {
        if (this._metaDater.oneTimeCHECKSugarcubeDebugging()) {
            return true;
        } else {
            return false;
        }
    })();

    
}


    
})();