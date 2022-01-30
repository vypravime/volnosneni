"use strict";

(function(){



setup.c10s.MyPage = function(
    _metaDater,
    _dialogInstance,
    _storyInstance,
    _uibarInstance,
    _htmlClasses
) {
    this._metaDater = _metaDater;
    this._dialog = _dialogInstance;
    this._story = _storyInstance;
    this._uibar = _uibarInstance;
    this._htmlClasses = _htmlClasses;

    this._eventNames = {
        devModeChange: 'app:devModeChange',
        UIBarToggling: 'UIBar:toggling'
    };
    this._labels = {
        UIBarToggleBtn: {
            toUnstow: 'Panel ukaž',
            toStow: 'Panel skryj'
        }
    };
};

let thatProto = setup.c10s.MyPage.prototype;


thatProto.getUIBarToggleBtnClass = function() {
    return this._htmlClasses.components.UIBarToggleButton.defaultClass;
};

thatProto.getUIBarToggleBtnLabel = function(isBarStowed) {
    if (typeof isBarStowed === 'undefined') {
        isBarStowed = this._uibar.isStowed();
    }
    let BtnText = ''
    if (isBarStowed) {
        BtnText = this._labels.UIBarToggleBtn.toUnstow;
    } else {
        BtnText = this._labels.UIBarToggleBtn.toStow;
    }
    return BtnText;
}

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

thatProto.onUIBarToggling = function(eventHandler) {
    $(document).on(
        this._eventNames['UIBarToggling'],
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

thatProto.registerAllCustomEventsHandlers = function() {
    this.registerGlobalEventHandlers();
    this.registerUIBarTogglingHandlers();
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

thatProto.registerUIBarTogglingHandlers = function() {
    this.onUIBarToggling((ev)=> {
        let wasStowed = this._uibar.isStowed();
        if (wasStowed) {
            this._uibar.unstow();
        } else {
            this._uibar.stow();
        }
        let isStowed = !wasStowed;

        this.textUIBarToggleBtn(isStowed);

        
    });
};

thatProto.textUIBarToggleBtn = function(isBarStowed) {
    $(document).ready(()=> {
        let BtnText = this.getUIBarToggleBtnLabel(isBarStowed);
        let BtnClass = this.getUIBarToggleBtnClass();
        $(`.${BtnClass}`)
        .find('button').html(BtnText);
    });
}

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};
thatProto.triggerUIBarToggling = function() {
    $(document).trigger(this._eventNames['UIBarToggling']);
};



})();