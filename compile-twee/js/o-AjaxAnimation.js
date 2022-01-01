"use strict";

setup.AjaxAnimation = class {
    _elementId = "ajax-anim-1";
    _basicTiming = 150;
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
            elements.each(function(i) {
                if (that.isSetOn()) {
                    console.log($(this));
                    console.log(that._basicTiming * (i+1));
                    $(this)
                        .delay(that._basicTiming * (i+1))
                        .toggleClass('active');
                } else {
                    elements.removeClass('active');
                    return false;
                }
            });
            setTimeout(
                () => {
                    if(this.isSetOn()) {
                        innerAnimManager(elements);
                    }
                },
                this._basicTiming * elements.length,
            );
        }
        let letters = $(`#${this._elementId} > span`);
        console.log(this._basicTiming * letters.length);
        innerAnimManager(letters);
    }

}