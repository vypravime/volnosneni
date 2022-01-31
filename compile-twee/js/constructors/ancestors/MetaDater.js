"use strict";

(function(){



setup.c10s.MetaDater = function(
    _stateInstance
) {
    this._state = _stateInstance;
    
    this._metaVarsNames = {
        /**boolean
         * (true results to not autoloading for this time) */
        oneTimeAutoloadSkip: 'oneTimeAutoloadSkip'
    }
}

let thatProto = setup.c10s.MetaDater.prototype;


thatProto.oneTimeCHECKAutoloadSkip = function() {
    if (this._state.metadata.has(
            this._metaVarsNames.oneTimeAutoloadSkip
            )
    ) {

        let metaValue = this._state.metadata.get(
            this._metaVarsNames.oneTimeAutoloadSkip
        );
        this._state.metadata.delete(
            this._metaVarsNames.oneTimeAutoloadSkip
        );
        if (metaValue === true) {
            return true;
        }
    }
    return false;
}

thatProto.setOneTimeAutoloadSkip = function() {
    this._state.metadata.set(
        this._metaVarsNames.oneTimeAutoloadSkip,
        true
    );
}



})();