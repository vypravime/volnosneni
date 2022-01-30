"use strict";

(function(){



setup.c10s.MyPage = function(
    _metaDater,
    _dialogInstance,
    _story
) {
    this._metaDater = _metaDater;
    this._dialog = _dialogInstance;
    this._story = _story;

    this._eventNames = {
        devModeChange: 'app:devModeChange'
    };
};

let thatProto = setup.c10s.MyPage.prototype;


thatProto.onDevModeChange = function(eventHandler) {
    $(document).on(
        this._eventNames['devModeChange'],
        (ev) => {eventHandler(ev);}
    );
};

thatProto.openPassageDialog = function(
    dialogHeader,
    dialogPassageTitle
) {
	if (this._dialog.isOpen()) {
        this._dialog.close();
    }
	this._dialog.setup(dialogHeader);
	this._dialog.wiki(
        this._story.get(dialogPassageTitle)
        .processText()
    ).open();
};

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};




})();