<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'App\\Http\\Controllers\\ESport'
], function ($router) {
    $router->get('/esports', 'ESportGameController@index')->name('esports.index');
    $router->get('/esports/{game}', 'ESportGameController@show')->name('esports.game');
    $router->get('/esports/{game}/{tournament}', 'ESportTournamentController@index')->name('esports.tournament');
    $router->get('/esports/{game}/{tournament}/{confrontation}', 'ESportConfrontationController@index')->name('esports.confrontation');
});
