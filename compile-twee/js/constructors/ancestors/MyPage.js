"use strict";

(function(){



setup.c10s.MyPage = function(
    _metaDater,
    _dialogInstance,
    _storyInstance,
    _uibarInstance,
    _htmler
) {
    this._metaDater = _metaDater;
    this._dialog = _dialogInstance;
    this._story = _storyInstance;
    this._uibar = _uibarInstance;
    this._htmler = _htmler;

    this._eventNames = {
        devModeChange: 'app:devModeChange',
        UIBarToggling: 'UIBar:toggling'
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

thatProto.onUIBarToggling = function(eventHandler) {
    $(document).on(
        this._eventNames['UIBarToggling'],
        (ev, isBarForMoveWaiting) => {
            eventHandler(ev, isBarForMoveWaiting);
        }
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
    this.onUIBarToggling((ev, isBarForMoveWaiting)=> {
        
        if(isBarForMoveWaiting) {
            let wasStowed = this._uibar.isStowed();
            if (wasStowed) {
                this._uibar.unstow();
            } else {
                this._uibar.stow();
            }
            let isStowed = !wasStowed;
            this._htmler.READYfillUIBarToggleBtn(isStowed);
        } else {
            setTimeout(()=>{
                let isStowed = this._uibar.isStowed();
                this._htmler.READYfillUIBarToggleBtn(isStowed);
            },100);
        }
        
    
    });

    /* so that the system default ui button also triggers my custom event */
    $(document).ready(()=>{
        $('#ui-bar-toggle').ariaClick(()=>{
            this.triggerUIBarToggling(false); //fase argument, because the UIBAR is now moving by default system a doesn't need to be moved twice
        });
    });
};

thatProto.triggerDevModeChange = function() {
    $(document).trigger(this._eventNames['devModeChange']);
};
thatProto.triggerUIBarToggling = function(
    isBarForMoveWaiting = true
) {
    $(document).trigger(
        this._eventNames['UIBarToggling'],
        [isBarForMoveWaiting]
    );
};



})();