"use strict";

/*CZECH localization of UI*/
(function () {
	/* General. */
	l10nStrings.identity = 'hra';
	l10nStrings.aborting = 'Zpracování bylo přerušeno';
	l10nStrings.cancel   = 'Storno';
	l10nStrings.close    = 'Zavřít';
	l10nStrings.ok       = 'OK';

	/* Errors. */
	l10nStrings.errorTitle              = 'Chyba';
	l10nStrings.errorToggle             = 'Přepnout zobrazení chyby';
	l10nStrings.errorNonexistentPassage = 'část s názvem "{passage}" neexistuje'; // NOTE: `passage` is supplied locally
	l10nStrings.errorSaveDiskLoadFailed = 'nepodařilo se nahrát z disku uložený soubor';
	l10nStrings.errorSaveMissingData    = 'nahraný soubor postrádá potřebná data. Tento soubor není uloženým stavem hry, nebo byl poškozen';
	l10nStrings.errorSaveIdMismatch     = 'uložený stav je z nesprávné hry';

	/* Warnings. */
	l10nStrings._warningIntroLacking  = 'Tvůj prohlížeč postrádá nebo má zakázané';
	l10nStrings._warningOutroDegraded = ', proto hra běží v omezeném módu. Můžeš pokračovat, nicméně některé části nemusí fungovat správně.';
	l10nStrings.warningNoWebStorage   = '{_warningIntroLacking} moderní úložiště dat (Web Storage API){_warningOutroDegraded}';
	l10nStrings.warningDegraded       = '{_warningIntroLacking} některé funkce nezbytné pro tuto hru{_warningOutroDegraded}';

	/* Debug bar. */
	l10nStrings.debugBarToggle      = 'Přepnout zobrazení ladící lišty';
	l10nStrings.debugBarNoWatches   = '\u2014 žádné sledování nenastaveno \u2014';
	l10nStrings.debugBarAddWatch    = 'Přidat sledování';
	l10nStrings.debugBarDeleteWatch = 'Zrušit sledování';
	l10nStrings.debugBarWatchAll    = 'Všechny sledovat';
	l10nStrings.debugBarWatchNone   = 'U všech zrušit sledování';
	l10nStrings.debugBarLabelAdd    = 'Přidat';
	l10nStrings.debugBarLabelWatch  = 'Sledovat';
	l10nStrings.debugBarLabelTurn   = 'Krok'; // (noun) chance to act (in a game), moment, period
	l10nStrings.debugBarLabelViews  = 'Pohledy';
	l10nStrings.debugBarViewsToggle = 'Přepnout ladící pohledy';
	l10nStrings.debugBarWatchToggle = 'Přepnout sledovací panel';

	/* UI bar. */
	l10nStrings.uiBarToggle   = 'Zobrazit/Skrýt postranní lištu';
	l10nStrings.uiBarBackward = 'Krok zpět v rámci historie hry';
	l10nStrings.uiBarForward  = 'Krok vpřed v rámci historie hry';
	l10nStrings.uiBarJumpto   = 'Přeskočit do konkrétního bodu v rámci historie hry';

	/* Jump To. */
	l10nStrings.jumptoTitle       = 'Přeskočit';
	l10nStrings.jumptoTurn        = 'Krok'; // (noun) chance to act (in a game), moment, period
	l10nStrings.jumptoUnavailable = 'Nyní nelze přeskočit do žádného místa hry\u2026';

	/* Saves. */
	l10nStrings.savesTitle       = 'Ulož, načti';
	l10nStrings.savesDisallowed  = 'V tomto místě hry ji není možné uložit.';
	l10nStrings.savesIncapable   = '{_warningIntroLacking} funkce nutné pro ukládání her, takže ukládání během tohoto herního sezení bude nemožné.';
	l10nStrings.savesLabelAuto   = 'automaticky uloženou pozici';
	l10nStrings.savesLabelDelete = 'Vymaž';
	l10nStrings.savesLabelExport = 'Ulož na disk\u2026';
	l10nStrings.savesLabelImport = 'Načti z disku\u2026';
	l10nStrings.savesLabelLoad   = 'Načti';
	l10nStrings.savesLabelClear  = 'Vymaž vše';
	l10nStrings.savesLabelSave   = 'Ulož';
	l10nStrings.savesLabelSlot   = '- pouzdro';
	l10nStrings.savesUnavailable = 'Nenalezena žádná pouzdra pro ukládání her\u2026';
	l10nStrings.savesUnknownDate = 'neznámý čas';

	/* Settings. */
	l10nStrings.settingsTitle = 'Nastavení';
	l10nStrings.settingsOff   = 'Vypnout';
	l10nStrings.settingsOn    = 'Zapnout';
	l10nStrings.settingsReset = 'Obnovit výchozí hodnoty';

	/* Restart. */
	l10nStrings.restartTitle  = 'Úvodní menu';
	l10nStrings.restartPrompt = 'Opravdu chceš <strong>zpátky na počáteční rozcestník?</strong><br><br><em>(neuložený postup hrou může být ztracen)</em>';

	/* Share. */
	l10nStrings.shareTitle = 'Sdílet';

	/* Alert. */
	l10nStrings.alertTitle = 'Upozornění';

	/* Autoload. */
	l10nStrings.autoloadTitle  = 'Nahrát předchozí hru?';
	l10nStrings.autoloadCancel = 'Spustit úvodní menu!';
	l10nStrings.autoloadOk     = 'Pokračovat v dřívější hře\u2026';
	l10nStrings.autoloadPrompt = 'Máme tu automaticky uložený stav poslední hry. Co teď?';

	/* Macros. */
	l10nStrings.macroBackText   = 'Zrušit poslední krok!';
	l10nStrings.macroReturnText = 'Přijmout a vrátit se\u2026';
})();