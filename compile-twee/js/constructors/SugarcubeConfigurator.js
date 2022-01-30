"use strict";

(function(){



setup.c10s.SugarcubeConfigurator = function(
    _stateInstance,
    _metaDater,
    autosaveBeginTurn = 3,
    savesVersion
) {
    this._state = _stateInstance;
    this._metaDater = _metaDater;


    Config.passages.nobr = true;
    Config.history.controls = false;

    Config.saves.id = "VypravimeApp"; //you MUSTN'T CHANGE THIS or the app refuses to load every older save
    Config.saves.version = savesVersion;
    Config.saves.autosave = ()=> {
        if (autosaveBeginTurn && (
                this._state.turns >= autosaveBeginTurn)) {
            return true;
        } else {
            return false;
        }
    }; 
    Config.saves.autoload = (()=>{
        if (this._metaDater.oneTimeCHECKAutoloadSkip()) {
            return false;
        } else {
            return "prompt";
        }
    })();

/*todo: IMPROVE DEPENDENCY INJECTION: */     
    /*Wrap every processed pasage text into additional div
    (the div gets either class 'my-passage',
    or id 'PassageHeader'/'PassageFooter').
    If the passage has the tag 'noAutoWrapDiv', no wrapping is done.
    */
    Config.passages.onProcess = function (p) {
        if (p.tags.includes('noAutoWrapDiv')) {
            return p.text;
        } else {
            let attrsStr = '';
            if (p.title === 'PassageHeader') {
                attrsStr = ' id="my-header"';
            } else if (p.title === 'PassageFooter') {
                attrsStr = ' id="my-footer"';
            } else {
                attrsStr = ' class="my-passage"'
            }
            return p.text = `<div${attrsStr}>${p.text}</div>`;
        }
    };

/**todo: ADD AUTOMATIC FROM APP HANDLING */
    Config.debug = false;

    
}


    
})();