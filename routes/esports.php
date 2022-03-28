<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'App\\Http\\Controllers\\ESport'
], function ($router) {
    $router->get('/esports', 'ESportController@index')->name('esports.index');
    $router->get('/esports/{game}', 'ESportController@game')->name('esports.game');
    $router->get('/esports/{game}/{tournament}', 'ESportController@tournament')->name('esports.tournament');
    $router->get('/esports/{game}/{tournament}/{confrontation}', 'ESportController@confrontation')->name('esports.confrontation');
});
