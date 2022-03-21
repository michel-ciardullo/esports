<?php

use Illuminate\Support\Facades\Route;

Route::get('/profile', 'App\\Http\\Controllers\\Profile\\ProfileController@index')
    ->name('profile');

Route::post('/profile/update/informations', 'App\\Http\\Controllers\\Profile\\ProfileController@updateInformations')
    ->name('profile.update.informations');

Route::post('/profile/update/security', 'App\\Http\\Controllers\\Profile\\ProfileController@updateSecurity')
    ->name('profile.update.security');

Route::delete('/profile/delete', 'App\\Http\\Controllers\\Profile\\ProfileController@destroy')
    ->middleware(['password.confirm'])
    ->name('profile.delete');
