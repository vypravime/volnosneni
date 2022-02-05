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

    Save.onLoad.add(function (save) {
        if (save.version > 1) {
            let e = {};
            e.message = `
<h3>
    Načtěte prosím tuto hru<br>
    v AKTUALIZOVANÉ VERZI APLIKACE...
</h3>
<p>
    Pokoušíte se načíst hru<br>
    pocházející z <strong>novější verze</strong><br>
    aplikace "Vyprávíme".<br>
</p>
<p>
    <a target="_blank" class="link-external" href="https://vypravime.webnode.cz/stahnout-ci-spustit-aplikaci/" tabindex="0">
        STÁHNĚTE SI NEJNOVĚJŠÍ VERZI aplikace Vyprávíme
    </a>
    
</p>
<p>
<em>(lze stáhnout i pomocí odkazu v levém rozbalovacím panelu)</em>
</p>        `;
            throw e;
        }
    });

}


    
})();