"use-strict";

(function(){



setup.c10s.Htmler = function(
    _htmlIds,
    _htmlClasses,
    _uibarInstance
) {
    Object.defineProperty(this, '__METHOD', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 'html'
    });

    this._htmlIds = _htmlIds;
    this._htmlClasses = _htmlClasses;
    this._uibar = _uibarInstance;

    this._legends = {
        UIBarToggleBtn: {
            toUnstow: '&gt;',
            toStow: '&lt;'
        }
    };
}

let thatProto = setup.c10s.Htmler.prototype;


/*Wrap processed pasage text into additional div
(the div gets either class 'my-passage',
or id 'PassageHeader'/'PassageFooter').
If the passage has the tag 'noAutoWrapDiv', no wrapping is done.
*/
thatProto.autoWrapPassageContent = function (passage) {
    if (passage.tags.includes('noAutoWrapDiv')) {
        return passage.text;
    } else {
        let attrsStr = '';
        if (passage.title === this._htmlIds.myHeader.givenPassageTitle) {
            attrsStr = ` id="${this._htmlIds.myHeader.id}"`;
        } else if (passage.title === this._htmlIds.myFooter.givenPassageTitle) {
            attrsStr = ` id="${this._htmlIds.myFooter.id}"`;
        } else {
            attrsStr = ` class="${this._htmlClasses.autoWrapping.passageContent.defaultClass}"`
        }
        return `<div${attrsStr}>${passage.text}</div>`;
    }
};


thatProto.getAjaxLoadSuperAnimationId = function() {
    return this._htmlIds.ajaxLoadSuperAnimation.id;
};
thatProto.getUIBarToggleBtnClass = function() {
    return this._htmlClasses.components.UIBarToggleButton.defaultClass;
};

/** the parameter isBarStowed can be omitted */
thatProto.READYfillUIBarToggleBtn = function(isBarStowed) {
    $(document).ready(()=> {
        let BtnText = this.sayUIBarToggleBtn(isBarStowed);
        let BtnClass = this.getUIBarToggleBtnClass();
        $(`.${BtnClass}`)
        .find('button')[this.__METHOD](BtnText);
    });
}

/** the parameter isBarStowed can be omitted */
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