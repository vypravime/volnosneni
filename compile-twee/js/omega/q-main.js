"use strict";

/**TO DO:
!! IMPORTANT: SET productionRelease IN DI_CONT CONFIGS TO TRUE !!
*
*
* VS: možnost přidávat nové hráče během hry (viz BeforeStartControlInfo1)
* v nápovědě dát tlačítko pro uložení hry do souboru (a výzvu to přiložit k emailu)
* 
*/



setup.sugarcubeConfigurator = setup.DI_CONT.getService(
  'sugarcubeConfigurator'
);

setup.myPage = setup.DI_CONT.getService(
  'myPage'
);
setup.myPage.registerAllCustomEventsHandlers();
