<?php

use Illuminate\Support\Facades\Route;

Route::get('/profile', 'App\\Http\\Controllers\\Profile\\ProfileController@index')
    ->middleware('auth')
    ->name('profile');

Route::post('/profile', 'App\\Http\\Controllers\\Profile\\ProfileController@updateInformations')
    ->middleware('auth')
    ->name('profile.updateInformations');
