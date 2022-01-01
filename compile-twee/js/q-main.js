"use strict";

/*
TO DO:
# odstranit při interním restartu varování "chceš opustit stránku?"
# povolit autosave: CONFIG.SAVES.AUTOSAVE = ... {return ... false : TRUE}
# UIBarSubtitle - dodat přesný link na novější verze ke stažení
# možnost přidávat nové hráče během hry (viz BeforeStartControlInfo1)
# v nápovědě dát tlačítko pro uložení hry do souboru (a výzvu to přiložit k emailu)
# při načítání SAVEu (ze souboru) zkontrolovat, jestli to není budoucí verze
*/




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

$(document).ready(function(){
  window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    e.returnValue = 'Hra VolnoSnění vás žádá o potvrzení, že ji opravdu chcete KOMPLETNĚ opustit. Údaje, které jste vložili, nemusí být uloženy.';
  });
});
