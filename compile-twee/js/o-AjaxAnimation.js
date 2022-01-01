"use strict";

setup.AjaxAnimation = class {
    _elementId = "ajax-anim-1";
    _basicTiming = 100;
    _active = false;
    constructor(basicTiming,elementId) {
        this._elementId = elementId || this._elementId;
        this._basicTiming = basicTiming || this._basicTiming;
    }
    isSetOn() {
        if (this._active === true) {
            return true;
        } else {
            return false;
        }
    }
    setOff() {
        this._active = false;
    }
    setOn() {
        this._active = true;
        let that = this;
        let innerAnimManager = elements => {
            let cyklusOffset = that._basicTiming * elements.length;  
            elements.each(function(i) {
                let jQthat = $(this);
                let addClassOffset = (i+1)*that._basicTiming;
                let removeClassOffset = cyklusOffset + addClassOffset;
                    setTimeout(function(){
                        if(that.isSetOn()) {
                            jQthat.addClass('active');
                        } else {
                            jQthat.removeClass('active')
                        }
                    },addClassOffset);
                    setTimeout(function(){
                        jQthat.removeClass('active');
                    },removeClassOffset);
            });
            setTimeout(function(){
                    if(that.isSetOn()) {
                        innerAnimManager(elements);
                    }
            },cyklusOffset * 2);
        }
        let letters = $(`#${this._elementId} > span`);
        innerAnimManager(letters);
    }

}