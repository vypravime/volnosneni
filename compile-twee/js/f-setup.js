"use strict";




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

setup.teloTaj = {
	bodyParts: {
		hands: [
			2,
			"obě své<br>DLANĚ, HŘBETY RUKOU A PRSTY NA RUKOU",
			"dlaních, hřbetech rukou či prstech na rukou"
		],
		arms: [
			2,
			"obě své<br>PAŽE OD ZÁPĚSTÍ AŽ PO RAMENA",
			"pažích od zápěstí až po ramena"
		],
		neck: [
			1,
			"celý svůj KRK",
			"krku"
		],
		head: [
			1,
			"celou svou HLAVU",
			"hlavě"
		],
		chest: [
			1,
			"celou svou HRUĎ",
			"hrudi"
		],
		belly: [
			1,
			"celé své BŘICHO",
			"břiše"
		],
		back: [
			1,
			"celá svá ZÁDA",
			"zádech"
		],
		pelvis: [
			1,
			"oblast své PÁNVE",
			"pánvi"
		],
		genitals: [
			1,
			"své PŘIROZENÍ",
			"přirození"
		],
		legs: [
			2,
			"obě své<br>NOHY OD KYČLÍ AŽ PO KOTNÍKY",
			"nohách od kyčlí až po kotníky"
		],
		foots: [
			2,
			"spodky i vršky<br>OBOU SVÝCH CHODIDEL A PRSTŮ NA NOHOU",
			"chodidlech a prstech na nohou"
		]
	},
	collectors: {
		lastGotoOverride: false
	}
};