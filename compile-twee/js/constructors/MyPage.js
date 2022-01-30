"use strict";

(function(){



setup.c10s.MyPage = function(
    _eventNames,
    _metaDater
) {
    this._eventNames = _eventNames;
    this._metaDater = _metaDater;
};

let thatProto = setup.c10s.MyPage.prototype;


thatProto.onDevModeChange = function(eventHandler) {
    $(document).on(
        this._eventNames['devModeChange'],
        (ev) => {eventHandler(ev);}
    );
};

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};




})();