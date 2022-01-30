"use strict";

//setup.experimental = true; //to show experimental parts of app

setup.page = {};
setup.page.onLeave = {
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

setup.page.onReady = {
	execute: function(){
		window.addEventListener(
			'beforeunload',
			function(ev) {
				setup.page.onLeave.tryPrevent(ev);
			}
		);
	
		$(document).one(
			':enginerestart',
			function(ev) {
				setup.page.onLeave.disablePreventation();
				setup.DI_CONT.getService('metaDater')
					.setOneTimeAutoloadSkip();
			}
		);
	}
};



setup.diceTypes = ['Starosvětsky', 'Virtuálně'];
setup.fPStartADefault = 3;
setup.addPlayer = function(arg) {
	return {name: arg, fp: setup.fPStartADefault};
};
setup.addGameCard = function() {
	return {
		text: '', 
		playerIndex: State.variables.pOrder[0],
		but: false,
		whoElse: []
	};
};
/*
Returns the name of the current active player
(returns it packed by 2nd opening and 3rd closing argument).
If no current player, 1st argument is returned.
*/
setup.whoseTurn = function(ifNo, ifYesBeg, ifYesEnd) {
	ifNo = ifNo || '';
	ifYesBeg = ifYesBeg || '';
	ifYesEnd = ifYesEnd || '';
	var _who = State.variables.players[State.variables.pOrder[0]];
	var _cond =  _who && _who.name;
	var _string = _cond ? ifYesBeg + _who.name + ifYesEnd : ifNo;
	return  _string;
};