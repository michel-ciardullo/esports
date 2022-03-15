<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => Inertia::render('Home'))
    ->name('home');

Route::resource('/games', 'App\\Http\\Controllers\\Game\\GameController')
    ->only(['index', 'show']);

Route::get('/profile', 'App\\Http\\Controllers\\Profile\\ProfileController@index')
    ->middleware('auth')
    ->name('profile');

Route::get('/profile/tickets', 'App\\Http\\Controllers\\Profile\\ProfileController@tickets')
    ->name('profile.tickets');

require __DIR__.'/auth.php';
