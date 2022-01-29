(function(){


setup.c10s.App = function(
    _stateInstance,
    _subGameBreadCrumbs
) {
    this._state = _stateInstance;
    this._subGameBreadCrumbs = _subGameBreadCrumbs;
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

thatProto.isSubGame = function(subclass) {
    if (subclass === this.getSubGameClass()) {
        return true;
    } else {
        return false;
    }
};



})()