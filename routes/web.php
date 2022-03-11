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

Route::get('/', fn () => Inertia::render('Home'))->name('home');

Route::resource('/games', 'App\\Http\\Controllers\\GameController')
    ->except(['create', 'store', 'edit', 'update', 'destroy'])
    ->only(['index', 'show']);

Route::get('/tournaments', fn () => Inertia::render('Tournaments'))->name('tournaments');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
