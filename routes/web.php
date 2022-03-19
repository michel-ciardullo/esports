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

Route::get('/about', 'App\\Http\\Controllers\\About\\AboutController@index')->name('about');

Route::get('/contact', 'App\\Http\\Controllers\\Contact\\ContactController@index')->name('contact');
Route::post('/contact', 'App\\Http\\Controllers\\Contact\\ContactController@send')->name('contact.send');

Route::get('/faq', 'App\\Http\\Controllers\\FAQ\\FAQController@index')->name('faq');

Route::resource('/esports', 'App\\Http\\Controllers\\ESport\\ESportController');

require __DIR__.'/auth.php';

Route::group([
    'middleware' => ['auth', 'verified']
], function () {
    require __DIR__.'/profile.php';
    require __DIR__.'/wallet.php';
});
