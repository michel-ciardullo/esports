<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'auth'
], function ($route) {
    $route->get('/profile', 'App\\Http\\Controllers\\Profile\\ProfileController@index')
        ->name('profile');

    $route->post('/profile/update/informations', 'App\\Http\\Controllers\\Profile\\ProfileController@updateInformations')
        ->name('profile.update.informations');

    $route->post('/profile/update/security', 'App\\Http\\Controllers\\Profile\\ProfileController@updateSecurity')
        ->name('profile.update.security');
});
