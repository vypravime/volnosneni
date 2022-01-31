"use-strict";

(function(){



setup.c10s.Htmler = function(
    _htmlClasses,
    _uibarInstance
) {
    Object.defineProperty(this, '__METHOD', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 'html'
    });

    this._htmlClasses = _htmlClasses;
    this._uibar = _uibarInstance;

    this._legends = {
        UIBarToggleBtn: {
            toUnstow: 'Panel ukaž',
            toStow: 'Panel skryj'
        }
    };
}

let thatProto = setup.c10s.Htmler.prototype;


thatProto.getUIBarToggleBtnClass = function() {
    return this._htmlClasses.components.UIBarToggleButton.defaultClass;
};

thatProto.READYfillUIBarToggleBtn = function(isBarStowed) {
    $(document).ready(()=> {
        let BtnText = this.sayUIBarToggleBtn(isBarStowed);
        let BtnClass = this.getUIBarToggleBtnClass();
        $(`.${BtnClass}`)
        .find('button')[this.__METHOD](BtnText);
    });
}

thatProto.sayUIBarToggleBtn = function(isBarStowed) {
    if (typeof isBarStowed === 'undefined') {
        isBarStowed = this._uibar.isStowed();
    }
    let BtnText = ''
    if (isBarStowed) {
        BtnText = this._legends.UIBarToggleBtn.toUnstow;
    } else {
        BtnText = this._legends.UIBarToggleBtn.toStow;
    }
    return BtnText;
}


})();