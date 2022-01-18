<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use Nette\Utils\FileSystem;
use Nette\Application\Responses\TextResponse;


final class VolnosneniPresenter extends Nette\Application\UI\Presenter
{    
    public function actionDefault() {
        if($this->isAjax()) {
            $this->actionAjax();
        } else {
            $rawHtml = FileSystem::Read(__DIR__ . '/templates/Volnosneni/default.html');
            $this->sendResponse(new TextResponse($rawHtml));
        }
    }
    public function actionAjax() {
            $this->getHttpResponse()->setHeader('Access-Control-Allow-Origin', '*');
            $request = $this->getHttpRequest();
            $postData = $request->getPost();
            bdump($postData);
            $fileString = FileSystem::Read(__DIR__ . '/ajaxTest/test1.txt');
            $fileString .= $request->getHeader('Origin') . "\r\n";
            $fileString .= "################\r\n";
            foreach($postData as $key => $value){
                $fileString .= $key . ': ' . $value . "\r\n";
            }
            $fileString .= "------END------\r\n\r\n";
            FileSystem::Write(__DIR__ . '/ajaxTest/test1.txt' , $fileString);
            $array = [
                'první položka' => 'Milujeme Janičku...',
                'druhá položka' => 'Máme radost, že to funguje! :-)',
                'třetí položka' => 'Jídlo bylo dobré.',
                'čtvrtá položka' => 'Hrajeme si s AJAXEM.',
                'PÁTÁ POLOŽKA' => 'CO ZŮSTANE A CO ODPADNE?'
            ];
            $answer = [];
            $answer = array_rand($array, 3);
            shuffle($answer);
            $this->sendJson([
                $answer[0] => $array[$answer[0]],
                $answer[1] => $array[$answer[1]],
                $answer[2] => $array[$answer[2]]
            ]);
    }
}
