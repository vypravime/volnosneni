(function(){


setup.c10s.App = function(
    _stateInstance,
    _subGameBreadCrumbs,
    _eventNames
) {
    this._state = _stateInstance;
    this._subGameBreadCrumbs = _subGameBreadCrumbs;
    this._eventNames = _eventNames;
    this._devMode = false;
}

let thatProto = setup.c10s.App.prototype;


thatProto.getSubGameBreadCrumb = function() {
	return this._subGameBreadCrumbs[
		this.getSubGameClass()
		];
};

thatProto.getSubGameClass = function() {
    return this._getSubGameClassFrom(
        this._state.passage
    );
};

thatProto._getSubGameClassFrom = function(passageTitle) {
    return passageTitle[0] + passageTitle[1]
};

thatProto.isDevMode = function() {
    if (this._devMode === true) {
        return true;
    } else {
        return false;
    }
}

thatProto.isGivenSubGame = function(subclass) {
    if (subclass === this.getSubGameClass()) {
        return true;
    } else {
        return false;
    }
};

thatProto.onDevModeChange = function(eventHandler) {
    $(document).on(
        this._eventNames['devModeChange'],
        (ev) => {eventHandler(ev);}
    );
};

thatProto.setDevModeOff = function() {
    this._devMode = false;
    this.triggerDevModeChange();
};

thatProto.setDevModeOn = function() {
    this._devMode = true;
    this.triggerDevModeChange();
};

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};



})()