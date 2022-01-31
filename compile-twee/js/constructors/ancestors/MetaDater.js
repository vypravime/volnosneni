"use strict";

(function(){



setup.c10s.MetaDater = function(
    _stateInstance
) {
    this._state = _stateInstance;
    
    this._metaVarsNames = {
        /**boolean
         * (true results to not autoloading for this time) */
        oneTimeAutoloadSkip: 'oneTimeAutoloadSkip',
        oneTimeStartDebugging: 'oneTimeStartDebugging'
    }
}

let thatProto = setup.c10s.MetaDater.prototype;



thatProto.oneTimeCHECKAutoloadSkip = function() {
    return this._oneTimeGeneralChecker(
        this._metaVarsNames.oneTimeAutoloadSkip
    );
};

thatProto.oneTimeCHECKSugarcubeDebugging = function() {
    return this._oneTimeGeneralChecker(
        this._metaVarsNames.oneTimeStartDebugging
    );
};

thatProto._oneTimeGeneralChecker = function(metaVarName) {
    if (this._state.metadata.has(metaVarName)) {

        let metaValue = this._state.metadata.get(metaVarName);
        this._state.metadata.delete(metaVarName);
        if (metaValue === true) {
            return true;
        }
    }
    return false;
};

thatProto.setOneTimeAutoloadSkip = function() {
    this._state.metadata.set(
        this._metaVarsNames.oneTimeAutoloadSkip,
        true
    );
};

thatProto.setOneTimeSugarcubeDebugging = function() {
    this._state.metadata.set(
        this._metaVarsNames.oneTimeStartDebugging,
        true
    );
}



})();