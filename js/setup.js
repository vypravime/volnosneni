"use strict";

setup.diceTypes = ['Starosvětsky', 'Virtuálně'];
setup.fPStartADefault = 3;
setup.fPStartAGetDesc = function(){
	if(settings.fPStartAmount === 1) {
		return 'osudový kámen';
	} else if((settings.fPStartAmount > 1) && (settings.fPStartAmount < 5)) {
		return 'osudové kameny';
	} else {
		return 'osudových kamenů';
	}
};
setup.fPStartAOnChange = function(){
	if (State.variables.roundCounter === 0){
		State.variables.players.forEach(function(item) {
			item.fp = settings.fPStartAmount;
		});
		$('.fp-start-a-refresh-numb').text(settings.fPStartAmount);
		$('.fp-start-a-refresh-desc').text(setup.fPStartAGetDesc());
	}
};
setup.addPlayer = function(arg) {
	return {name: arg, fp: settings.fPStartAmount};
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