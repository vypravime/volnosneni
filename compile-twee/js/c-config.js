"use strict";

Config.debug = false;

Config.saves.autosave = function() {return turns() < 3 ? false : true};
Config.saves.autoload = function(){
    if (State.metadata.get('skipAutoSave')) {
        State.metadata.delete('skipAutoSave');
        return false;
    } else {
        return "prompt";
    }
}();
Config.saves.id = "volnosneni";
Config.saves.version = 1;

Config.history.controls = false;

Config.passages.nobr = true;
/*Wrap every processed pasage text into additional div
  (the div gets either class 'my-passage',
   or id 'PassageHeader'/'PassageFooter').
  If the passage has the tag 'noAutoWrapDiv', no wrapping is done.
*/
Config.passages.onProcess = function (p) {
    if (p.tags.includes('noAutoWrapDiv')) {
        return p.text;
    } else {
        let attrsStr = '';
        if (p.title === 'PassageHeader') {
            attrsStr = ' id="my-header"';
        } else if (p.title === 'PassageFooter') {
            attrsStr = ' id="my-footer"';
        } else {
            attrsStr = ' class="my-passage"'
        }
    	return p.text = `<div${attrsStr}>${p.text}</div>`;
    }
};