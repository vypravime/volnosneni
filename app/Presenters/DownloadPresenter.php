<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use Nette\Application\Responses\FileResponse;


final class DownloadPresenter extends Nette\Application\UI\Presenter
{
    public function actionDefault() {
        $filePath = __DIR__ . '/templates/Homepage/default.html';
        $this->sendResponse(new FileResponse($filePath, 'vypravime-0-2-1.html'));
    }

    public function actionOlderVersions($id) {
        $filePath = __DIR__ . '/templates/Download/olderVersions/' . $id . '.html';
        $this->sendResponse(new FileResponse($filePath, 'vypravime-' . $id . '.html'));
    }
}
