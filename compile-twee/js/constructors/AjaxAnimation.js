"use strict";

(function() {


setup.c10s.AjaxAnimation = function(
    _elementClass = 'ajax-anim-1',
    _basicTiming = 100
) {
    this._elementClass = _elementClass;
    this._basicTiming = _basicTiming;
    this._active = false;
};

let thatProto = setup.c10s.AjaxAnimation.prototype;


thatProto.isOn = function() {
    if (this._active === true) {
        return true;
    } else {
        return false;
    }
};

thatProto.setOff = function() {
    this._active = false;
};

thatProto.setOn = function() {
    if (!this.isOn()) {
        this._active = true;
        let that = this;
        let innerAnimManager = elements => {
            let cyklusOffset = that._basicTiming * elements.length;  
            elements.each(function(i) {
                let jQthat = $(this);
                let addClassOffset = (i+1)*that._basicTiming;
                let removeClassOffset = cyklusOffset + addClassOffset;
                    setTimeout(function(){
                        if(that.isOn()) {
                            jQthat.addClass('active');
                        } else {
                            jQthat.removeClass('active');
                        }
                    },addClassOffset);
                    setTimeout(function(){
                        jQthat.removeClass('active');
                    },removeClassOffset);
            });
            setTimeout(function(){
                    if(that.isOn()) {
                        innerAnimManager(elements);
                    }
            },cyklusOffset * 2);
        };
        let animations = $(`.${this._elementClass}`);
        animations.each(function(i) {
            let lettersOfOneAnimation = $(this).children('span');
            innerAnimManager(lettersOfOneAnimation);
        });
    }
}


})();