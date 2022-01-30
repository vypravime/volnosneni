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

thatProto.onLeave = {
	_preventing: true,
	tryPrevent: function (ev) {
		if (this._preventing) {
			// Cancel the event
			ev.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
			// Chrome requires returnValue to be set
			ev.returnValue = 'Aplikace Vyprávíme vás žádá o potvrzení, že ji opravdu chcete KOMPLETNĚ opustit. Údaje, které jste vložili, nemusí být uloženy.';
		}
	},
	disablePreventation: function() {
		this._preventing = false;
	}
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

thatProto.registerGlobalEventHandlers = function() {
    window.addEventListener(
        'beforeunload',
        (ev)=> {this.onLeave.tryPrevent(ev);}
    );

    $(document).one(
        ':enginerestart',
        (ev) => {
            this.onLeave.disablePreventation();
            this._metaDater.setOneTimeAutoloadSkip();
        }
    );
};

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};




})();