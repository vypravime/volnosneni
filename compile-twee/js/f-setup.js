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
				State.metadata.set('skipAutoSave', 'true');
			}
		);
	}
};
setup.page.openPassageDialog = function(dHeader, dPassage) {
	if (Dialog.isOpen()) {Dialog.close();}
	Dialog.setup(dHeader);
	Dialog.wiki(Story.get(dPassage).processText()).open();
};



setup.diceTypes = ['Starosvětsky', 'Virtuálně'];
setup.fPStartADefault = 3;
setup.fPStartAGetDesc = function(amount){
	if(amount === 1) {
		return 'osudový kámen';
	} else if((amount > 1) && (amount < 5)) {
		return 'osudové kameny';
	} else {
		return 'osudových kamenů';
	}
};
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

setup.crazyFunction = function(onFunc, disableMap, identClass) {
	onFunc.call(setup.DI_CONT.getService('app'),
		function(ev) {
			let btns = $(`.${identClass}`)
				.find('button');
			console.log(btns);
			btns.each(function(i){
				$(this).ariaDisabled(disableMap[i]());
			});
	});
};