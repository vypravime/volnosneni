<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use Nette\Utils\FileSystem;
use Nette\Application\Responses\TextResponse;


final class HomepagePresenter extends Nette\Application\UI\Presenter
{
    public function actionDefault() {
        $rawHtml = FileSystem::Read(__DIR__ . '/templates/Homepage/default.html');
        $this->sendResponse(new TextResponse($rawHtml));
    }
}
