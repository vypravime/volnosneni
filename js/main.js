"use strict";

/*
TO DO:
# povolit autosave: CONFIG.SAVES.AUTOSAVE = ... {return ... false : TRUE}
# UIBarSubtitle - dodat přesný link na novější verze ke stažení
# možnost přidávat nové hráče během hry (viz BeforeStartControlInfo1)
# v nápovědě dát tlačítko pro uložení hry do souboru (a výzvu to přiložit k emailu)
# při načítání SAVEu (ze souboru) zkontrolovat, jestli to není budoucí verze
*/

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


Setting.addList('diceType',{
    label: "''Jak hážeš KOSTKOU?''",
    desc: '//(Šestistěnnou kostkou po staru na stole,<br>či losovacím tlačítkem v této aplikaci.)//<hr>',
    list: setup.diceTypes,
    default: setup.diceTypes[0],
});
Setting.addList('fPStartAmount',{
    label: "''S kolika OSUDOVÝMI KAMENY hráč začíná?''",
    desc: '//(Čím víc, tím je start hry snazší, přímočařejší, ale nudnější.)//<hr>',
    list: [0,1,2,3,4,5,6,7,8],
    default: setup.fPStartADefault,
	onChange: setup.fPStartAOnChange
});