"use strict";

Config.debug = false;

Config.saves.autosave = function() {return turns() === 1 ? false : false};
Config.saves.autoload = "prompt";
Config.saves.id = "volnosneni";
Config.saves.version = 1;

Config.passages.nobr = true;