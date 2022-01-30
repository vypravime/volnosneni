(function(){


setup.c10s.App = function(
    _stateInstance,
    _subGameBreadCrumbs,
    _myPage
) {
    this._state = _stateInstance;
    this._subGameBreadCrumbs = _subGameBreadCrumbs;
    this._myPage = _myPage;

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

thatProto.setDevModeOff = function() {
    this._devMode = false;
    this._myPage.triggerDevModeChange();
};

thatProto.setDevModeOn = function() {
    this._devMode = true;
    this._myPage.triggerDevModeChange();
};



})()