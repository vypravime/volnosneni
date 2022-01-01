"use strict";

let AjaxAnimation = class {
    _elementId = "ajax-anim-1";
    _basicTiming = 150;
    _active = false;
    constructor(basicTiming,elementId) {
        this._elementId = elementId;
        this._basicTiming = basicTiming;
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
        let innerAnimManager = elements => {    
            elements.forEach(el => {
                if (this.isSetOn()) {
                    el.toggleClass('active');
                    wait(this._basicTiming);
                } else {
                    elements.removeClass('active');
                    break;
                }
            });
            setTimeout(
                () => {
                    if(this.isSetOn()) {
                        innerAnimManager(elements);
                    }
                },
                this._basicTiming * elements.size(),
            );
        }
        let letters = $(`#${this._elementId} > span`);
        innerAnimManager(letters);
    }

}